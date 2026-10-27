(() => {
  const $=id=>document.getElementById(id);
  const state={products:[],bills:[],cart:[],category:"All",lastBill:null,business:{ name: "Teapost Desi Morbi", phone: "87777 37277", address: "Opp.Dmart, LE College Road, Morbi-2", gstin: "" }};
  const money=n=>"₹"+Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
  const whole=n=>"₹"+Math.round(Number(n||0)).toLocaleString("en-IN");
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const localDate=d=>{const x=new Date(d);return x.toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});};
  const isoLocal=d=>{const x=new Date(d.getTime()-d.getTimezoneOffset()*60000);return x.toISOString().slice(0,16);};
  let toastTimer;
  function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800);}
  function setPage(page){
    document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));
    document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
    const titles={billing:["POINT OF SALE","New bill"],products:["CATALOGUE","Products"],history:["RECORDS","Sales history"],reports:["ANALYTICS","Reports & export"],settings:["PREFERENCES","Settings & backup"]};
    $("pageEyebrow").textContent=titles[page][0];$("pageTitle").textContent=titles[page][1];$("sidebar").classList.remove("open");
    if(page==="products")renderProducts();if(page==="history")renderHistory();if(page==="reports")renderReports();
  }
  function totals(){
    const subtotal=state.cart.reduce((s,l)=>s+l.price*l.qty,0);
    const gstOn=$("gstEnabled").checked,rate=Number($("gstRate").value||5),gst=gstOn?subtotal*rate/100:0;
    const raw=subtotal+gst,rounded=Math.round(raw);
    return {subtotal,gst,rate:gstOn?rate:0,raw,rounded,rounding:rounded-raw,gstOn};
  }
  function renderProductsForBilling(){
    const search=$("productSearch").value.trim().toLowerCase();
    const available=state.products.filter(p=>p.active && (state.category==="All"||((p.category||"Other")===state.category)) && (p.name.toLowerCase().includes(search)||(p.category||"").toLowerCase().includes(search)));
    $("availableCount").textContent=available.length+" items";$("noProducts").classList.toggle("hidden",available.length>0);
    $("productGrid").innerHTML=available.map(p=>`<button class="product-card" data-add="${esc(p.id)}"><span class="product-icon">＋</span><strong>${esc(p.name)}</strong><small>${money(p.price)}</small><span class="product-category">${esc(p.category||"Other")} · before GST</span></button>`).join("");
    const cats=["All",...new Set(state.products.filter(p=>p.active).map(p=>p.category||"Other"))];
    $("categoryRow").innerHTML=cats.map(c=>`<button class="chip ${state.category===c?"selected":""}" data-category="${esc(c)}">${esc(c==="All"?"All items":c)}</button>`).join("");
  }
  function openOrderDrawer(){
    $("checkoutPanel").classList.add("open");
    $("orderBackdrop").classList.add("open");
    document.body.classList.add("order-open");
  }
  function closeOrderDrawer(){
    $("checkoutPanel").classList.remove("open");
    $("orderBackdrop").classList.remove("open");
    document.body.classList.remove("order-open");
  }
  function updateCartButton(){
    const qty=state.cart.reduce((s,l)=>s+Number(l.qty||0),0);
    const total=state.cart.reduce((s,l)=>s+Number(l.price||0)*Number(l.qty||0),0);
    $("cartFabCount").textContent=qty;
    $("cartFabSummary").textContent=qty?`${qty} item${qty===1?"":"s"} · ${money(total)}`:"0 items · ₹0";
  }
  function renderCart(){
    $("cartSubtitle").textContent=state.cart.length?state.cart.reduce((s,l)=>s+l.qty,0)+" units · "+state.cart.length+" products":"No items added yet";
    $("cartItems").innerHTML=state.cart.length?state.cart.map(l=>`<div class="cart-line"><div class="cart-line-name">${esc(l.name)}<small>${money(l.price)} each</small></div><div class="qty-control"><button data-qty="${esc(l.productId)}" data-delta="-1" aria-label="Decrease">−</button><span>${l.qty}</span><button data-qty="${esc(l.productId)}" data-delta="1" aria-label="Increase">+</button></div><div class="line-total">${money(l.price*l.qty)}</div><button class="remove-line" data-remove="${esc(l.productId)}" aria-label="Remove">×</button></div>`).join(""):`<div class="cart-empty">Your order is empty.<br><span>Select products to begin.</span></div>`;
    const t=totals();$("subtotalValue").textContent=money(t.subtotal);$("gstValue").textContent=money(t.gst);$("gstLabel").textContent=t.gstOn?`(${t.rate}%)`:"(off)";$("roundingValue").textContent=(t.rounding>=0?"+":"−")+money(Math.abs(t.rounding)).replace("₹","₹");$("grandTotal").textContent=whole(t.rounded);
    $("completeSale").disabled=!state.cart.length;$("completeSale").style.opacity=state.cart.length?"1":".55";
    updateCartButton();
  }
  function addToCart(id){const p=state.products.find(x=>x.id===id);if(!p||!p.active)return;const line=state.cart.find(x=>x.productId===id);if(line)line.qty++;else state.cart.push({productId:p.id,name:p.name,price:Number(p.price),qty:1});renderCart();}
  function renderProducts(){
    const list=[...state.products].sort((a,b)=>a.name.localeCompare(b.name));
    $("productsTable").innerHTML=list.map(p=>`<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.category||"Other")}</td><td>${money(p.price)}</td><td><span class="status-tag ${p.active?"":"inactive"}">${p.active?"Available":"Inactive"}</span></td><td><button class="table-action" data-edit-product="${esc(p.id)}">Edit</button> <button class="table-action" data-toggle-product="${esc(p.id)}">${p.active?"Disable":"Enable"}</button></td></tr>`).join("");
    $("emptyProducts").classList.toggle("hidden",list.length>0);
  }
  function openProductModal(p){
    $("productModalTitle").textContent=p?"Edit product":"Add product";$("editProductId").value=p?.id||"";$("productName").value=p?.name||"";$("productPrice").value=p?.price??"";$("productCategory").value=p?.category||"";$("productActive").checked=p?.active!==false;$("productModal").classList.remove("hidden");$("productName").focus();
  }
  function closeModal(id){$(id).classList.add("hidden");}
  function getFilteredBills(fromId,toId,searchId,paymentId){
    const from=$(fromId)?.value?new Date($(fromId).value).getTime():-Infinity;
    const to=$(toId)?.value?new Date($(toId).value).getTime():Infinity;
    const search=searchId?$(searchId).value.trim().toLowerCase():"";
    const payment=paymentId?$(paymentId).value:"";
    return state.bills.filter(b=>{const ts=new Date(b.createdAt).getTime();const hay=[b.billNo,b.customerName,b.mobile,b.tableNumber].join(" ").toLowerCase();return ts>=from&&ts<=to&&(!search||hay.includes(search))&&(!payment||b.paymentMethod===payment);}).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  }
  function renderHistory(){
    const bills=getFilteredBills("historyFrom","historyTo","historySearch","historyPayment");
    $("historyCount").textContent=`${bills.length} bill${bills.length===1?"":"s"} · ${whole(bills.reduce((s,b)=>s+b.total,0))}`;
    $("historyTable").innerHTML=bills.map(b=>`<tr><td><strong>${esc(b.billNo)}</strong></td><td>${esc(localDate(b.createdAt))}</td><td>${esc(b.customerName||"Walk-in")}<br><span style="color:#9b8790;font-size:9px">${esc(b.mobile||"")}</span></td><td>${esc(b.tableNumber||"—")}</td><td>${esc(b.paymentMethod)}</td><td><strong>${whole(b.total)}</strong></td><td><button class="table-action" data-view-bill="${esc(b.id)}">View / print</button></td></tr>`).join("");
    $("emptyHistory").classList.toggle("hidden",bills.length>0);
  }
  function renderReports(){
    const bills=getFilteredBills("reportFrom","reportTo",null,null);
    const items=bills.reduce((s,b)=>s+(b.items||[]).reduce((a,i)=>a+Number(i.qty),0),0);
    $("reportSales").textContent=whole(bills.reduce((s,b)=>s+b.total,0));$("reportBills").textContent=bills.length+" bills";$("reportItems").textContent=items.toLocaleString("en-IN");$("reportGst").textContent=money(bills.reduce((s,b)=>s+b.gst,0));
  }
  function makeReceipt(b){
    const business=b.businessSnapshot||state.business;
    const itemRows=(b.items||[]).map(i=>`<tr><td>${esc(i.name)}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">${money(i.price)}</td><td style="text-align:right">${money(i.price*i.qty)}</td></tr>`).join("");
    return `<div class="receipt" id="receiptToPrint"><div class="receipt-head"><h2>${esc(business.name||"Business")}</h2>${business.address?`<p>${esc(business.address)}</p>`:""}${business.phone?`<p>Phone: ${esc(business.phone)}</p>`:""}${business.gstin?`<p>GSTIN: ${esc(business.gstin)}</p>`:""}<p> CASH MEMO / TAX INVOICE </p><p>${esc(b.billNo)}</p></div><div class="receipt-meta"><div><b>Customer:</b> ${esc(b.customerName||"Walk-in")}</div><div><b>Mobile:</b> ${esc(b.mobile||"—")}</div><div><b>Table:</b> ${esc(b.tableNumber||"—")}</div><div><b>Date:</b> ${esc(localDate(b.createdAt))}</div><div><b>Payment:</b> ${esc(b.paymentMethod)}</div></div><table><thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">Amount</th></tr></thead><tbody>${itemRows}</tbody></table><div style="margin-top:12px;display:grid;gap:7px;font-size:11px"><div style="display:flex;justify-content:space-between"><span>Subtotal</span><b>${money(b.subtotal)}</b></div><div style="display:flex;justify-content:space-between"><span>GST ${b.gstRate?`(${b.gstRate}%)`:"(not applied)"}</span><b>${money(b.gst)}</b></div><div style="display:flex;justify-content:space-between"><span>Rounding adjustment</span><b>${(b.rounding>=0?"+":"−")+money(Math.abs(b.rounding))}</b></div><div style="display:flex;justify-content:space-between;border-top:1px dashed #aaa;padding-top:10px" class="receipt-total"><span>TOTAL</span><b>${whole(b.total)}</b></div></div><div class="receipt-foot">Thank you for visiting!<br>Please visit again.</div></div>`;
  }
  function showBill(b){state.lastBill=b;$("billPreview").innerHTML=makeReceipt(b);$("billModal").classList.remove("hidden");}
  async function completeSale(){
    if(!state.cart.length)return toast("Add at least one item first.");
    const mobile=$("customerMobile").value.trim();
    if(mobile&&!/^[+\d\s()-]{7,20}$/.test(mobile))return toast("Please check the mobile number.");
    const t=totals(),createdAt=new Date().toISOString(),billNo=await POSDB.nextBillNo();
    const bill={id:crypto.randomUUID?crypto.randomUUID():"bill-"+Date.now()+"-"+Math.random().toString(16).slice(2),billNo,createdAt,customerName:$("customerName").value.trim()||"Walk-in",mobile,tableNumber:$("tableNumber").value.trim(),paymentMethod:$("paymentMethod").value,items:state.cart.map(i=>({...i,price:Number(i.price),qty:Number(i.qty)})),subtotal:Number(t.subtotal.toFixed(2)),gstRate:t.rate,gst:Number(t.gst.toFixed(2)),rawTotal:Number(t.raw.toFixed(2)),rounding:Number(t.rounding.toFixed(2)),total:t.rounded,businessSnapshot:{...state.business}};
    try{await POSDB.saveBill(bill);state.bills.push(bill);state.cart=[];$("customerName").value="";$("customerMobile").value="";$("tableNumber").value="";$("paymentMethod").value="Cash";renderCart();renderHistory();renderReports();closeOrderDrawer();showBill(bill);toast("Sale saved successfully.");}
    catch(e){console.error(e);toast("Could not save the bill. Please try again.");}
  }
  function printBill(){
    if(!state.lastBill)return;
    const old=document.getElementById("printRoot");if(old)old.remove();
    const root=document.createElement("div");root.id="printRoot";root.innerHTML=makeReceipt(state.lastBill);document.body.appendChild(root);
    document.body.classList.add("printing-bill");
    const style=document.createElement("style");style.id="printTempStyle";style.textContent="@media print{body>*:not(#printRoot){display:none!important}#printRoot{display:block!important;max-width:80mm;margin:0 auto;font-family:Arial,sans-serif}#printRoot .receipt{border:0;padding:0}#printRoot table{width:100%;border-collapse:collapse}#printRoot th,#printRoot td{padding:5px 2px;font-size:10px}}";document.head.appendChild(style);
    window.print();setTimeout(()=>{document.body.classList.remove("printing-bill");root.remove();style.remove();},500);
  }
  function xmlEscape(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}
  function xCell(value,type){if(typeof value==="number"&&Number.isFinite(value))return `<Cell><Data ss:Type="Number">${value}</Data></Cell>`;return `<Cell><Data ss:Type="String">${xmlEscape(value)}</Data></Cell>`;}
  function sheet(name,headers,rows){return `<Worksheet ss:Name="${xmlEscape(name)}"><Table><Row>${headers.map(xCell).join("")}</Row>${rows.map(row=>`<Row>${row.map(xCell).join("")}</Row>`).join("")}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane></WorksheetOptions></Worksheet>`;}
  function exportWorkbook(){
    const bills=getFilteredBills("reportFrom","reportTo",null,null);
    const billHeaders=["Bill No","Date","Time","Customer Name","Mobile Number","Table Number","Payment Method","Subtotal Before GST","GST Rate (%)","GST Amount","Raw Total","Rounding Adjustment","Total Payable"];
    const billRows=bills.map(b=>{const d=new Date(b.createdAt);return [b.billNo,d.toLocaleDateString("en-CA"),d.toLocaleTimeString("en-GB"),b.customerName,b.mobile,b.tableNumber,b.paymentMethod,b.subtotal,b.gstRate,b.gst,b.rawTotal,b.rounding,b.total];});
    // One row per purchased item, linked to its parent bill by Bill No.
    // This makes it possible to filter any bill and see exactly which items, quantities and amounts belong to it.
    const itemHeaders=["Bill No","Date","Time","Customer Name","Mobile Number","Table Number","Payment Method","Item Name","Quantity","Unit Price","Amount"];
    const itemRows=bills.flatMap(b=>{
      const d=new Date(b.createdAt);
      return (b.items||[]).map(i=>{
        const qty=Number(i.qty)||0;
        const price=Number(i.price)||0;
        return [b.billNo,d.toLocaleDateString("en-CA"),d.toLocaleTimeString("en-GB"),b.customerName,b.mobile,b.tableNumber,b.paymentMethod,i.name,qty,price,Number((price*qty).toFixed(2))];
      });
    });
    const xml=`<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">${sheet("Bills",billHeaders,billRows)}${sheet("Bill Items",itemHeaders,itemRows)}</Workbook>`;
    downloadBlob(new Blob([xml],{type:"application/vnd.ms-excel;charset=utf-8"}),`pos-sales-${new Date().toISOString().slice(0,10)}.xls`);toast(`Exported ${bills.length} bills and ${itemRows.length} item rows.`);
  }
  function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  async function closeBusinessDay(){
    if(!state.bills.length)return toast("There are no bills to close for today.");
    const ok=confirm(`You have ${state.bills.length} bills saved today.

Make sure you have exported the Excel workbook first.

Close the day and permanently delete today's bills from this device?
The next bill will start again at BILL-000001.`);
    if(!ok)return;
    try{
      await POSDB.resetDailySales();
      state.bills=[];state.cart=[];state.lastBill=null;
      renderCart();renderHistory();renderReports();
      toast("Day closed. Bills cleared and numbering reset to BILL-000001.");
    }catch(e){console.error(e);toast("Could not close the day. No data was deleted.");}
  }
  function exportCSV(){
    const bills=getFilteredBills("reportFrom","reportTo",null,null);
    const rows=[["Bill No","Date & Time","Customer Name","Mobile Number","Table Number","Payment Method","Subtotal","GST Rate","GST","Rounding","Total"],...bills.map(b=>[b.billNo,localDate(b.createdAt),b.customerName,b.mobile,b.tableNumber,b.paymentMethod,b.subtotal,b.gstRate,b.gst,b.rounding,b.total])];
    const csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
    downloadBlob(new Blob([csv],{type:"text/csv;charset=utf-8"}),`pos-bills-${new Date().toISOString().slice(0,10)}.csv`);toast("CSV exported.");
  }
  async function backup(){
    const data={format:"NxOs-pos-backup-v1",exportedAt:new Date().toISOString(),products:state.products,bills:state.bills,settings:[{key:"business",value:state.business}]};
    downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),`NxOs-pos-backup-${new Date().toISOString().slice(0,10)}.json`);toast("Backup downloaded.");
  }
  async function restore(file){
    try{const data=JSON.parse(await file.text());if(data.format!=="NxOs-pos-backup-v1"||!Array.isArray(data.products)||!Array.isArray(data.bills))throw new Error("Invalid backup file");
      if(!confirm(`Restore ${data.products.length} products and ${data.bills.length} bills? This replaces current local data.`))return;
      await POSDB.replaceAll(data);await loadData();toast("Backup restored successfully.");
    }catch(e){console.error(e);toast("Could not restore. Please select a valid NxOs POS backup.");}finally{$("restoreFile").value="";}
  }
  async function loadData(){
    state.products=await POSDB.all("products");state.bills=await POSDB.all("bills");state.business=await POSDB.getSetting("business")||state.business;
    $("businessName").value=state.business.name||"";$("businessPhone").value=state.business.phone||"";$("businessAddress").value=state.business.address||"";$("businessGstin").value=state.business.gstin||"";
    renderProductsForBilling();renderCart();renderProducts();renderHistory();renderReports();$("storageStatus").textContent=`IndexedDB ready · ${state.products.length} products · ${state.bills.length} bills`;
  }
  function setDefaultDates(){
    const now=new Date(),start=new Date(now);start.setHours(0,0,0,0);
    ["historyTo","reportTo"].forEach(id=>$(id).value=isoLocal(now));["historyFrom","reportFrom"].forEach(id=>$(id).value=isoLocal(start));
  }
  document.addEventListener("click",async e=>{
    const nav=e.target.closest("[data-page]");if(nav){setPage(nav.dataset.page);return;}
    const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return;}
    const cat=e.target.closest("[data-category]");if(cat){state.category=cat.dataset.category;renderProductsForBilling();return;}
    const qty=e.target.closest("[data-qty]");if(qty){const line=state.cart.find(x=>x.productId===qty.dataset.qty);if(line){line.qty+=Number(qty.dataset.delta);if(line.qty<=0)state.cart=state.cart.filter(x=>x!==line);renderCart();}return;}
    const rem=e.target.closest("[data-remove]");if(rem){state.cart=state.cart.filter(x=>x.productId!==rem.dataset.remove);renderCart();return;}
    const edit=e.target.closest("[data-edit-product]");if(edit){openProductModal(state.products.find(p=>p.id===edit.dataset.editProduct));return;}
    const toggle=e.target.closest("[data-toggle-product]");if(toggle){const p=state.products.find(p=>p.id===toggle.dataset.toggleProduct);p.active=!p.active;await POSDB.put("products",p);await loadData();toast(p.active?"Product enabled":"Product disabled");return;}
    const view=e.target.closest("[data-view-bill]");if(view){const b=state.bills.find(b=>b.id===view.dataset.viewBill);if(b)showBill(b);return;}
    if(e.target.closest("[data-close-modal]")){closeModal("productModal");closeModal("billModal");return;}
  });
  $("productSearch").addEventListener("input",renderProductsForBilling);
  $("gstEnabled").addEventListener("change",renderCart);$("gstRate").addEventListener("change",renderCart);
  $("clearCart").addEventListener("click",()=>{state.cart=[];renderCart();});
  $("openCart").addEventListener("click",openOrderDrawer);
  $("closeCart").addEventListener("click",closeOrderDrawer);
  $("orderBackdrop").addEventListener("click",closeOrderDrawer);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOrderDrawer();});
  $("completeSale").addEventListener("click",completeSale);
  $("addProductBtn").addEventListener("click",()=>openProductModal());
  $("productForm").addEventListener("submit",async e=>{e.preventDefault();const id=$("editProductId").value||("p-"+(crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random().toString(16).slice(2)));const price=Number($("productPrice").value);if(!Number.isFinite(price)||price<0)return toast("Enter a valid price.");const p={id,name:$("productName").value.trim(),price,category:$("productCategory").value.trim()||"Other",active:$("productActive").checked};await POSDB.put("products",p);await loadData();closeModal("productModal");toast("Product saved.");});
  $("historyFrom").addEventListener("change",renderHistory);$("historyTo").addEventListener("change",renderHistory);$("historySearch").addEventListener("input",renderHistory);$("historyPayment").addEventListener("change",renderHistory);
  $("applyHistoryFilters").addEventListener("click",renderHistory);
  $("resetHistoryFilters").addEventListener("click",()=>{$("historyFrom").value="";$("historyTo").value="";$("historySearch").value="";$("historyPayment").value="";renderHistory();});
  $("historyExport").addEventListener("click",()=>{setPage("reports");$("reportFrom").value=$("historyFrom").value;$("reportTo").value=$("historyTo").value;exportWorkbook();});
  $("reportFrom").addEventListener("change",renderReports);$("reportTo").addEventListener("change",renderReports);
  $("exportWorkbook").addEventListener("click",exportWorkbook);$("exportCsv").addEventListener("click",exportCSV);$("closeBusinessDay").addEventListener("click",closeBusinessDay);
  $("printBillBtn").addEventListener("click",printBill);
  $("quickNewBill").addEventListener("click",()=>{closeOrderDrawer();state.cart=[];$("customerName").value="";$("customerMobile").value="";$("tableNumber").value="";$("paymentMethod").value="Cash";renderCart();setPage("billing");});
  $("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
  $("businessForm").addEventListener("submit",async e=>{e.preventDefault();state.business={name:$("businessName").value.trim()||"Business",phone:$("businessPhone").value.trim(),address:$("businessAddress").value.trim(),gstin:$("businessGstin").value.trim()};await POSDB.setSetting("business",state.business);toast("Business details saved.");});
  $("backupBtn").addEventListener("click",backup);$("restoreFile").addEventListener("change",e=>{if(e.target.files?.[0])restore(e.target.files[0]);});
  $("clearAllData").addEventListener("click",async()=>{if(!confirm("Permanently clear all products, bills and settings from this browser?"))return;if(!confirm("Final confirmation: this cannot be undone. Have you downloaded a backup?"))return;await POSDB.clearStore("products");await POSDB.clearStore("bills");await POSDB.clearStore("settings");await POSDB.init();state.cart=[];await loadData();toast("Local data cleared. Demo products restored.");});
  window.addEventListener("online",()=>{$("connectionLabel").textContent="Online";});window.addEventListener("offline",()=>{$("connectionLabel").textContent="Offline";});
  (async()=>{try{await POSDB.init();setDefaultDates();await loadData();$("connectionLabel").textContent=navigator.onLine?"Online · local storage":"Offline";}catch(e){console.error(e);$("storageStatus").textContent="Database unavailable. Open using localhost or HTTPS.";toast("Storage could not initialize. Try a modern browser.");}})();
})();