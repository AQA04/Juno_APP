(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();function q({label:r,type:t="text",value:o="",placeholder:a="",id:e,onInput:n}){const i=document.createElement("div");i.className="input-group mb-md";const s=document.createElement("label");s.className="input-label",s.textContent=r,s.htmlFor=e;const l=document.createElement("input");l.type=t==="money"?"text":t,l.className="input-field",l.value=o,l.placeholder=a,l.id=e,n&&l.addEventListener("input",p=>n(p));const d=document.createElement("style");return d.textContent=`
    .input-group {
      display: flex;
      flex-direction: column;
    }
    .input-label {
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: var(--font-size-sm);
      font-weight: 500;
    }
    .input-field {
      background: var(--color-input-bg);
      border: 1px solid var(--color-text-secondary);
      border-radius: var(--border-radius-sm);
      padding: 12px;
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      transition: border-color 0.3s;
    }
    .input-field:focus {
      border-color: var(--color-primary);
    }
  `,document.getElementById("component-styles-input")||(d.id="component-styles-input",document.head.appendChild(d)),i.appendChild(s),i.appendChild(l),i}function A({label:r,options:t,id:o,value:a,onChange:e}){const n=document.createElement("div");n.className="input-group mb-lg";const i=document.createElement("label");i.className="input-label",i.textContent=r,i.htmlFor=o;const s=document.createElement("div");s.style.position="relative";const l=document.createElement("select");l.className="input-field w-full",l.id=o,l.style.appearance="none",l.style.cursor="pointer",t.forEach(p=>{const c=document.createElement("option");c.value=p.value,c.textContent=p.label,l.appendChild(c)}),a!==void 0&&(l.value=a),e&&l.addEventListener("change",e);const d=document.createElement("div");return d.innerHTML="▼",d.style.cssText=`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-primary);
    font-size: 0.8rem;
  `,s.appendChild(l),s.appendChild(d),n.appendChild(i),n.appendChild(s),n}function B({text:r,onClick:t}){const o=document.createElement("button");o.textContent=r,o.className="btn-primary",t&&o.addEventListener("click",t);const a=document.createElement("style");return a.textContent=`
    .btn-primary {
      background: linear-gradient(90deg, #9C27B0, #673AB7); /* Purple gradient closer to image */
      border: none;
      border-radius: var(--border-radius-pill);
      padding: 14px 32px;
      color: white;
      font-weight: 600;
      font-size: var(--font-size-base);
      cursor: pointer;
      width: 100%; /* Full width on mobile often looks better or centered */
      max-width: 200px;
      margin: 0 auto;
      display: block;
      box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .btn-primary:active {
      transform: scale(0.98);
    }
  `,document.getElementById("component-styles-button")||(a.id="component-styles-button",document.head.appendChild(a)),o}const D="juno_app_data";class R{constructor(){this.state={income:{net:"",hours:"",days:"",frequency:"quincenal"},funds:[{id:"fixed",title:"Gastos fijos",percentage:50,isMandatory:!0,color:"#4fd1ed",description:"Tus gastos necesarios para vivir (arriendo, servicios, etc).",tip:"Lo ideal es que no superen el 50% de tus ingresos."},{id:"debts",title:"Deudas",percentage:10,isMandatory:!0,color:"#ffb347",description:"Pagos obligatorios a terceros.",tip:"Las deudas no deben sobrepasar el 30% de tus ingresos."},{id:"emergency",title:"Fondo de emergencia",percentage:10,isMandatory:!0,color:"#b194d9",description:"Dinero reservado para imprevistos.",tip:"Deberían ser tus gastos fijos de 3 meses como mínimo."}],history:[],fundsMode:"percent"},this.load()}load(){try{const t=localStorage.getItem(D);if(t){const o=JSON.parse(t);o.bonuses&&delete o.bonuses,this.state={...this.state,...o},this.state.history||(this.state.history=[])}}catch(t){console.error("Failed to load data from localStorage",t)}}save(){try{const t=JSON.stringify(this.state);localStorage.setItem(D,t)}catch(t){console.error("Failed to save data to localStorage",t)}}getIncomeData(){return this.state.income}getNetIncome(){const t=(this.state.income.net||"0").toString().replace(/[^0-9]/g,"");return parseFloat(t)||0}setIncomeData(t){this.state.income={...this.state.income,...t},this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}getFunds(){return this.state.funds}getFundsMode(){return this.state.fundsMode}setFundsMode(t){this.state.fundsMode=t,this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}addFund(t){const o={id:Date.now().toString(),isMandatory:!1,spent:0,color:"#4fd1ed",...t};this.state.funds.push(o),this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}updateFund(t,o){const a=this.state.funds.findIndex(e=>e.id===t);a!==-1&&(this.state.funds[a]={...this.state.funds[a],...o},this.save(),document.dispatchEvent(new CustomEvent("stateChanged")))}removeFund(t){this.state.funds=this.state.funds.filter(o=>o.id!==t||o.isMandatory),this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}addHistoryEntry({fundId:t,amount:o,description:a,type:e,date:n}){const i={id:Date.now().toString()+Math.random().toString(36).substr(2,5),fundId:t,amount:parseFloat(o)||0,description:a||"Sin descripción",type:e||"out",date:n||new Date().toISOString().split("T")[0]};if(this.state.history.unshift(i),e==="out"){const s=this.state.funds.find(l=>l.id===t);s&&(s.spent=(s.spent||0)+i.amount)}this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}getHistory(t){return this.state.history.filter(o=>o.fundId===t)}removeHistoryEntry(t){const o=this.state.history.findIndex(a=>a.id===t);if(o!==-1){const a=this.state.history[o];if(a.type==="out"){const e=this.state.funds.find(n=>n.id===a.fundId);e&&(e.spent=Math.max(0,(e.spent||0)-a.amount))}this.state.history.splice(o,1),this.save(),document.dispatchEvent(new CustomEvent("stateChanged"))}}}const h=new R;function G(){const r=h.getIncomeData(),t=document.createElement("div");t.className="screen-container";const o=document.createElement("div");o.className="screen-content",t.appendChild(o);const a=document.createElement("h1");a.innerText="INGRESOS",a.className="screen-title";const e=document.createElement("div");e.className="card",e.style.cssText=`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: var(--spacing-md);
    `;const n=q({label:"Ingreso neto",type:"money",value:r.net||"",placeholder:"1'000'000",id:"income",onInput:c=>{let f=c.target.value.replace(/[^0-9]/g,"");f&&(c.target.value=f.replace(/\B(?=(\d{3})+(?!\d))/g,"'"))}}),i=document.createElement("div");i.className="flex gap-md",i.style.width="100%";const s=q({label:"Horas",type:"number",value:r.hours||"",placeholder:"8",id:"hours",onInput:c=>{c.target.value=c.target.value.replace(/[^0-9]/g,"")}});s.style.flex="1",s.querySelector("input").style.width="100%";const l=q({label:"Días",type:"number",value:r.days||"",placeholder:"5",id:"days",onInput:c=>{c.target.value=c.target.value.replace(/[^0-9]/g,"")}});l.style.flex="1",l.querySelector("input").style.width="100%",i.appendChild(s),i.appendChild(l);const d=A({label:"Frecuencia",id:"frequency",value:r.frequency||"quincenal",options:[{value:"quincenal",label:"Quincenal"},{value:"mensual",label:"Mensual"},{value:"trimestral",label:"Trimestral"}],onChange:c=>{h.setIncomeData({frequency:c.target.value})}}),p=B({text:"",onClick:()=>{const c=n.querySelector("input").value,f=s.querySelector("input").value,u=l.querySelector("input").value,x=d.querySelector("select").value;h.setIncomeData({net:c,hours:f,days:u,frequency:x});const C=document.querySelector(".btn-primary"),w=C.innerHTML;C.innerHTML="<span>✓</span> Guardado",setTimeout(()=>C.innerHTML=w,2e3)}});return p.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <path d="M17 21v-8H7v8" fill="rgba(0,0,0,0.2)"/> 
            <path d="M7 3v5h8V3" fill="rgba(0,0,0,0.2)"/>
        </svg>
        Guardar
    `,p.style.display="flex",p.style.justifyContent="center",p.style.alignItems="center",p.style.marginTop="var(--spacing-lg)",e.appendChild(n),e.appendChild(i),e.appendChild(d),e.appendChild(p),o.appendChild(a),o.appendChild(e),t}(function(){if(document.getElementById("expenses-styles"))return;const t=document.createElement("style");t.id="expenses-styles",t.textContent=`
        .expenses-screen {
            padding: var(--spacing-md);
            padding-bottom: 120px;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        .expenses-card {
            background: linear-gradient(145deg, rgba(30,30,35,0.9), rgba(20,20,25,0.9));
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            padding: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .expenses-inputs-row {
            display: flex;
            gap: 12px;
            justify-content: space-between;
        }
        .expenses-input-container {
            flex: 1;
            min-width: 0;
        }
        .expenses-field {
            width: 100%;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px 10px;
            color: white;
            font-size: 14px;
            font-family: var(--font-family-base);
            transition: all 0.2s;
        }
        .expenses-field:focus {
            outline: none;
            background: rgba(255,255,255,0.15);
            border-color: var(--color-primary);
        }
        .expenses-field::placeholder { color: rgba(255,255,255,0.5); }
        .expenses-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            padding-right: 30px;
        }
        .btn-save {
            background: linear-gradient(135deg,#b194d9,#7c5cb7);
            border: none;
            border-radius: 50px;
            padding: 12px 30px;
            color: white;
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            align-self: center;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(124,92,183,0.4);
            letter-spacing: 1px;
        }
        .btn-save:active { transform: scale(0.95); opacity: 0.9; }
        .history-section { display: flex; flex-direction: column; gap: var(--spacing-md); }
        .history-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--color-text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding-left: 10px;
        }
        .history-card {
            background: linear-gradient(145deg, rgba(30,30,35,0.9), rgba(20,20,25,0.9));
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            min-height: 120px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            padding: var(--spacing-md);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .char-counter {
            font-size: 10px;
            color: var(--color-text-secondary);
            text-align: right;
            margin-top: 4px;
        }
        .history-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            position: relative;
            overflow: hidden;
            cursor: default;
        }
        .history-item:last-child { border-bottom: none; padding-bottom: 0; }
        .history-item.pressing { background: rgba(255,255,255,0.05); }
        .history-item-top { display: flex; justify-content: space-between; align-items: center; }
        .history-item-desc { color: white; font-size: 14px; font-weight: 500; }
        .history-item-amount { color: #ff4d4d; font-weight: 900; font-size: 14px; }
        .history-item-fund { color: rgba(236,236,236,0.4); font-size: 11px; }
        .history-item-content { position: relative; z-index: 1; pointer-events: none; }
        .empty-history { text-align: center; color: var(--color-text-secondary); font-size: 13px; margin: auto; }
        .delete-hint {
            position: absolute;
            right: 0; top: 0;
            height: 100%;
            background: #ff4d4d;
            color: white;
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 10px;
            font-weight: 900;
            transform: translateX(100%);
            transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
            z-index: 2;
            cursor: pointer;
        }
        .delete-hint.visible { transform: translateX(0); }
    `,document.head.appendChild(t)})();function W(){const r=document.createElement("div");r.className="screen-container";function t(){r.innerHTML=`
            <div class="expenses-screen">
                <h1 class="screen-title">GASTOS</h1>
                
                <div class="expenses-card">
                    <div class="expenses-inputs-row">
                        <div class="expenses-input-container">
                            <input type="text" class="expenses-field" placeholder="Dinero" id="expense-amount">
                        </div>
                        <div class="expenses-input-container">
                            <input type="text" class="expenses-field" placeholder="Descripción" id="expense-desc" maxlength="30">
                            <div class="char-counter" id="char-count">0/30</div>
                        </div>
                        <div class="expenses-input-container">
                            <select class="expenses-field expenses-select" id="expense-fund">
                                <option value="" disabled selected>Fondo</option>
                                ${h.getFunds().map(e=>`<option value="${e.id}">${e.title}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <button class="btn-save" id="btn-save-expense">GUARDAR</button>
                </div>

                <div class="history-section">
                    <h2 class="history-title">Historial de Gastos</h2>
                    <div class="history-card" id="history-list">
                        <!-- History items will be rendered here -->
                    </div>
                </div>
            </div>
        `,o(),a()}function o(){const e=r.querySelector("#expense-amount"),n=r.querySelector("#expense-desc"),i=r.querySelector("#char-count"),s=r.querySelector("#expense-fund"),l=r.querySelector("#btn-save-expense");e.addEventListener("input",d=>{let p=d.target.value.replace(/\D/g,"");p?d.target.value=`$${parseInt(p).toLocaleString()}`:d.target.value=""}),n.addEventListener("input",d=>{i.textContent=`${d.target.value.length}/30`}),l.addEventListener("click",()=>{const d=e.value.replace(/\D/g,""),p=parseFloat(d),c=n.value.trim(),f=s.value;if(!p||p<=0){alert("Por favor, ingresa un monto válido.");return}if(!c){alert("Por favor, ingresa una descripción.");return}if(!f){alert("Por favor, selecciona un fondo.");return}h.addHistoryEntry({fundId:f,amount:p,description:c,type:"out"}),e.value="",n.value="",i.textContent="0/30",s.selectedIndex=0})}function a(){const e=r.querySelector("#history-list"),n=h.state.history.filter(s=>s.type==="out"),i=h.getFunds();if(n.length===0){e.innerHTML='<p class="empty-history">Sin movimientos registrados</p>';return}e.innerHTML=n.map(s=>{const l=i.find(p=>p.id===s.fundId),d=l?l.title:"Desconocido";return`
                <div class="history-item" data-id="${s.id}" style="position: relative; overflow: hidden; cursor: default;">
                    <div class="history-item-content" style="width: 100%; transition: transform 0.2s;">
                        <div class="history-item-top">
                            <span class="history-item-desc">${s.description}</span>
                            <span class="history-item-amount">-$${s.amount.toLocaleString()}</span>
                        </div>
                        <span class="history-item-fund">${d}</span>
                    </div>
                    <div class="delete-hint">BORRAR</div>
                </div>
            `}).join(""),e.querySelectorAll(".history-item").forEach(s=>{let l;const d=()=>{s.classList.add("pressing"),l=setTimeout(()=>{s.querySelector(".delete-hint").classList.add("visible"),s.querySelector(".history-item-content").style.transform="translateX(-80px)",s.onclick=c=>{c.stopPropagation(),h.removeHistoryEntry(s.dataset.id),a()}},800)},p=()=>{clearTimeout(l),s.classList.remove("pressing")};s.addEventListener("mousedown",d),s.addEventListener("touchstart",d),s.addEventListener("mouseup",p),s.addEventListener("mouseleave",p),s.addEventListener("touchend",p)})}return t(),document.addEventListener("stateChanged",()=>{const e=r.querySelector("#expense-fund"),n=e.value;e.innerHTML=`
            <option value="" disabled ${n?"":"selected"}>Fondo</option>
            ${h.getFunds().map(i=>`<option value="${i.id}" ${i.id===n?"selected":""}>${i.title}</option>`).join("")}
        `,a()}),r}function V(r=50,t=0,o=100,a="#4fd1ed"){const s=2*Math.PI*42,l=t>o,d=l?"#ff4d4d":a,p=Math.min(100,Math.max(0,r)),c=s-p/100*s;return`
        <svg width="100" height="100" viewBox="0 0 100 100" style="overflow: visible;">
            <!-- Background circle -->
            <circle cx="${100/2}" cy="${100/2}" r="42" 
                fill="transparent" 
                stroke="rgba(255, 255, 255, 0.08)" 
                stroke-width="16" />
            
            <!-- Progress circle -->
            <circle
                cx="${100/2}" cy="${100/2}" r="42"
                fill="transparent"
                stroke="${d}"
                stroke-width="16"
                stroke-dasharray="${s}"
                stroke-dashoffset="${c}"
                stroke-linecap="round"
                transform="rotate(-90 ${100/2} ${100/2})"
                style="transition: stroke-dashoffset 0.5s ease-in-out;"
            />
            
            ${l?`
                <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ff4d4d" font-size="28" font-weight="900" font-family="sans-serif">
                    !
                </text>
            `:""}
        </svg>
    `}function X(r,t,o,a=!1){const e=document.createElement("div");e.className="info-tooltip-container",e.style.cssText=`
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    `,e.innerHTML=`
        <button class="info-btn" style="background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 22px; height: 22px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 200; font-family: serif;">i</button>
        <div class="tooltip-box" style="display: none; position: absolute; top: 28px; right: 0; width: 220px; background: #1a1a1e; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 15px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); pointer-events: none;">
            ${a?'<div style="color: #ff4d4d; font-size: 16px; margin-bottom: 5px;">🔒</div>':""}
            <p style="font-size: 13px; margin-bottom: 10px; color: #ececec; line-height: 1.4;">${t}</p>
            <div style="font-size: 12px; color: #b194d9; font-style: italic; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                <b style="color: white; font-style: normal;">💡 Proceso:</b> ${o}
            </div>
        </div>
    `;const n=e.querySelector(".info-btn"),i=e.querySelector(".tooltip-box");return n.onclick=s=>{s.stopPropagation();const l=i.style.display==="block";document.querySelectorAll(".tooltip-box").forEach(d=>d.style.display="none"),i.style.display=l?"none":"block"},e}function O({title:r,content:t,onConfirm:o,confirmText:a="Guardar"}){const e=document.createElement("div");e.className="modal-overlay",e.style.cssText=`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
        display: flex; justify-content: center; align-items: center;
        z-index: 1000; padding: var(--spacing-md);
    `;const n=document.createElement("div");n.className="modal-content card",n.style.cssText=`
        width: 100%; max-width: 340px; background: #1a1a1e;
        border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px;
        padding: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md);
    `,n.innerHTML=`
        <h2 style="color: white; font-size: 1.3rem; margin-bottom: var(--spacing-sm); text-align: center; font-weight: 900;">${r}</h2>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            ${t}
        </div>
        <div class="modal-actions" style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
            <button class="btn-cancel" style="flex: 1; background: rgba(255,255,255,0.08); border: none; padding: 12px; border-radius: 12px; color: white; cursor: pointer;">Cancelar</button>
            <button class="btn-confirm" style="flex: 1; background: linear-gradient(135deg, #b194d9, #7c5cb7); border: none; padding: 12px; border-radius: 12px; color: white; font-weight: 900; cursor: pointer;">${a}</button>
        </div>
    `,e.appendChild(n);const i=()=>e.remove();return n.querySelector(".btn-cancel").onclick=i,n.querySelector(".btn-confirm").onclick=()=>{o(n)&&i()},e.onclick=s=>{s.target===e&&i()},e}function Y(r){const{id:t,title:o,percentage:a=0,isMandatory:e,description:n,tip:i,spent:s=0,color:l="#4fd1ed"}=r,d=h.getFundsMode(),p=h.getNetIncome(),c=document.createElement("div");c.className="fund-item";const f=parseFloat((p*(a/100)).toFixed(2)),u=parseFloat(a.toFixed(1)),x=parseFloat((f-s).toFixed(2)),C=d==="percent"?`${u}%`:`$${Math.round(f).toLocaleString()}`,w=d==="percent"?`Disponible: <b>$${x.toLocaleString()}</b>`:`Ingreso: <b>${u}%</b>`,L=`
        <div class="fund-chart-container" style="pointer-events: none;">
            ${V(u,s,f,l)}
        </div>
        <div class="fund-available" style="pointer-events: none;">${w}</div>
        <div class="input-wrapper" style="position: relative; z-index: 5;">
            <input type="text" class="fund-input-percentage" value="${C}" data-id="${t}">
        </div>
    `;c.innerHTML=`
        <div class="fund-title">${o}</div>
        <div class="fund-card" id="card-${t}" style="cursor: pointer;">
            ${L}
        </div>
    `;const v=c.querySelector(".fund-card"),S=m=>m.stopPropagation(),b=c.querySelector("input");if(b&&(b.onclick=S),e){const m=X(o,n,i,!0);m.onclick=S,v.appendChild(m)}v.onclick=()=>{const m=E=>{const F=h.getHistory(t),N=E.querySelector(".history-list");N.innerHTML=`
                ${F.length===0?'<p style="text-align:center; color: var(--color-text-secondary); font-size: 13px;">Sin movimientos registrados</p>':""}
                ${F.map(y=>`
                    <div class="history-item" data-id="${y.id}" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; cursor: default; transition: background 0.2s; position: relative; overflow: hidden;">
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <span style="font-size: 13px; color: white; font-weight: 600;">${y.description}</span>
                            <span style="font-size: 10px; color: var(--color-text-secondary);">${y.date}</span>
                        </div>
                        <span style="font-size: 14px; font-weight: 900; color: ${y.type==="in"?"#50c878":"#ff4d4d"};">
                            ${y.type==="in"?"+":"-"} $${parseInt(y.amount).toLocaleString()}
                        </span>
                        <div class="delete-hint" style="position:absolute; right:0; top:0; height:100%; background: #ff4d4d; color: white; display: flex; align-items:center; padding: 0 15px; font-size: 10px; font-weight:bold; transform: translateX(100%); transition: transform 0.2s;">BORRAR</div>
                    </div>
                `).join("")}
            `,N.querySelectorAll(".history-item").forEach(y=>{let I;const H=()=>{y.style.background="rgba(255,255,255,0.1)",I=setTimeout(()=>{y.querySelector(".delete-hint").style.transform="translateX(0)",y.onclick=j=>{j.stopPropagation(),h.removeHistoryEntry(y.dataset.id),m(E)}},800)},T=()=>{clearTimeout(I),y.style.background="rgba(255,255,255,0.03)"};y.addEventListener("mousedown",H),y.addEventListener("touchstart",H),y.addEventListener("mouseup",T),y.addEventListener("mouseleave",T),y.addEventListener("touchend",T)})},g=O({title:`Historial: ${o}`,confirmText:"Cerrar",content:`
                <p style="text-align:center; font-size: 10px; color: var(--color-text-secondary); margin-bottom: 10px;">Mantén presionado para borrar</p>
                <div class="history-list" style="max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; width: 100%;">
                </div>
            `,onConfirm:()=>!0});document.body.appendChild(g),m(g)};let k;const M=m=>{e||(v.classList.add("pressing"),k=setTimeout(()=>z(),800))},$=()=>{clearTimeout(k),v.classList.remove("pressing")},z=()=>{const m=document.createElement("div");m.className="delete-overlay",m.innerHTML=`
            <div style="font-size: 20px; margin-bottom: 12px;">🗑️</div>
            <button class="btn-confirm-delete" style="background: white; color: #ff4d4d; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 900; font-size: 13px; cursor: pointer;">Borrar Fondo</button>
            <button class="btn-cancel-delete" style="background: transparent; border: none; color: white; margin-top: 12px; font-size: 11px; cursor: pointer; text-decoration: underline;">Cancelar</button>
        `,m.onclick=S,v.appendChild(m),m.querySelector(".btn-confirm-delete").onclick=g=>{g.stopPropagation(),h.removeFund(t)},m.querySelector(".btn-cancel-delete").onclick=g=>{g.stopPropagation(),m.remove()}};return v.addEventListener("mousedown",M),v.addEventListener("touchstart",M),v.addEventListener("mouseup",$),v.addEventListener("mouseleave",$),v.addEventListener("touchend",$),b&&(b.addEventListener("input",m=>{if(d==="currency"){let g=m.target.value.replace(/\D/g,"");g?m.target.value=`$${parseInt(g).toLocaleString()}`:m.target.value=""}}),b.addEventListener("focus",()=>{const m=b.value.replace(/\D/g,"");b.value=m==="0"?"":m}),b.addEventListener("blur",()=>{const m=b.value.replace(/\D/g,"");let g=a;if(m!==""){const E=parseFloat(m);d==="percent"?g=Math.min(100,E||0):g=Math.min(100,E/p*100||0),h.updateFund(t,{percentage:g})}else{const E=parseFloat((p*(a/100)).toFixed(2)),F=parseFloat(a.toFixed(1));b.value=d==="percent"?`${F}%`:`$${Math.round(E).toLocaleString()}`}})),c}function _(){const r=document.createElement("div");r.className="screen-container",r.style.cssText=`
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;function t(){r.innerHTML="";const o=h.getFundsMode(),a=h.getFunds(),e=h.getNetIncome(),n=document.createElement("div");n.className="funds-header",n.style.cssText=`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            width: 100%;
            flex-shrink: 0;
            background: transparent;
        `,n.innerHTML=`
            <div class="mode-switch-wrapper" style="width: 60px; display: flex; justify-content: flex-start;">
                <div class="switch ${o==="percent"?"on":"off"}">
                    <div class="handle" data-label="${o==="percent"?"%":"$"}"></div>
                </div>
            </div>
            
            <h1 class="screen-title" style="flex: 1; margin: 0; text-align: center;">FONDOS</h1>
            
            <div class="fab-wrapper" style="width: 60px; display: flex; justify-content: flex-end;">
                <button class="btn-fab-create" id="btn-add-fund" style="position: static; transform: none;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        `,r.appendChild(n),n.querySelector(".switch").onclick=()=>{h.setFundsMode(o==="percent"?"currency":"percent")},n.querySelector("#btn-add-fund").onclick=()=>{const l=["#4fd1ed","#ffb347","#b194d9","#50c878","#ff69b4"],d=o==="percent",p=O({title:"Nuevo Fondo",content:`
                    <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
                        <input type="text" id="m-f-name" placeholder="Nombre" class="fund-input-percentage" style="width: 100%; max-width: none; text-align: left; background: rgba(255,255,255,0.05); padding: 12px 15px;">
                        
                        <input type="text" id="m-f-val" 
                            placeholder="${d?"Porcentaje (%)":"Monto ($)"}" 
                            class="fund-input-percentage ${d?"":"money-input"}" 
                            style="width: 100%; max-width: none; text-align: left; background: rgba(255,255,255,0.05); padding: 12px 15px;">
                        
                        <p style="color: var(--color-text-secondary); font-size: 11px; margin-top: 10px; margin-bottom: 5px; text-align: center;">Elige un color:</p>
                        <div style="display:flex; justify-content:center; gap:12px;">
                            ${l.map(u=>`<div class="color-opt" data-color="${u}" style="width:32px; height:32px; border-radius:50%; background:${u}; cursor:pointer; border:2px solid transparent; transition: transform 0.2s;"></div>`).join("")}
                        </div>
                    </div>
                    <input type="hidden" id="m-f-color" value="${l[0]}">
                `,onConfirm:u=>{const x=u.querySelector("#m-f-name").value,C=u.querySelector("#m-f-val").value.replace(/\D/g,""),w=parseFloat(C),L=u.querySelector("#m-f-color").value;if(x&&!isNaN(w)){let v=w;return d||(v=w/e*100),h.addFund({title:x,percentage:Math.min(100,v),color:L}),!0}return!1}});document.body.appendChild(p);const c=p.querySelector("#m-f-val");c.oninput=u=>{if(!d){let x=u.target.value.replace(/\D/g,"");x?u.target.value=`$${parseInt(x).toLocaleString()}`:u.target.value=""}},c.onblur=()=>{const u=c.value.replace(/\D/g,"");u&&parseFloat(u)!==0?d?c.value=`${Math.min(100,parseFloat(u))}%`:c.value=`$${parseFloat(u).toLocaleString()}`:c.value=""},c.onfocus=()=>{const u=c.value.replace(/\D/g,"");c.value=u==="0"?"":u},p.querySelectorAll(".color-opt").forEach(u=>{u.onclick=()=>{p.querySelectorAll(".color-opt").forEach(x=>{x.style.borderColor="transparent",x.style.transform="scale(1)"}),u.style.borderColor="white",u.style.transform="scale(1.2)",p.querySelector("#m-f-color").value=u.dataset.color}});const f=p.querySelector(".color-opt");f&&(f.style.borderColor="white",f.style.transform="scale(1.2)")};const i=document.createElement("div");i.className="funds-scroll-container";const s=document.createElement("div");s.className="funds-grid",a.forEach(l=>s.appendChild(Y(l))),i.appendChild(s),r.appendChild(i)}return t(),document.addEventListener("stateChanged",t),r}function J(){const r=h.getIncomeData(),t=parseFloat(r.net.replace(/[^0-9]/g,""))||0,o=parseFloat(r.hours)||0,a=parseFloat(r.days)||0,n={quincenal:2,mensual:4,trimestral:12}[r.frequency]||4,i=o*a*n,s=i>0?t/i:0,l=document.createElement("div");l.className="screen-container";const d=document.createElement("div");d.className="screen-content",l.appendChild(d);const p=document.createElement("h1");p.className="screen-title",p.textContent="CALCULADORA",d.appendChild(p);const c=document.createElement("div");c.className="calculator-container",d.appendChild(c);const f=document.createElement("div");f.className="calculator-section";const u=document.createElement("div");u.className="section-title",u.innerHTML="<span>$</span> Dinero → Tiempo",f.appendChild(u);const x=q({label:"¿Cuánto cuesta?",type:"text",placeholder:"$ 0",id:"money-input"}),C=x.querySelector("input"),w=P("Tiempo de trabajo equivalente","0 días y 0 horas","Eso es lo que tendrías que trabajar para pagarlo ⏰");w.classList.add("hidden"),C.addEventListener("input",m=>{let g=m.target.value.replace(/\D/g,"");if(g){if(m.target.value=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(g),s>0){const E=parseFloat(g)/s,F=Math.floor(E/(o||8)),N=Math.round(E%(o||8));w.querySelector(".result-value").textContent=`${F} días y ${N} horas`,w.classList.remove("hidden")}}else m.target.value="",w.classList.add("hidden")}),f.appendChild(x),f.appendChild(w),c.appendChild(f);const L=document.createElement("div");L.className="arrow-divider",L.innerHTML="↓",c.appendChild(L);const v=document.createElement("div");v.className="calculator-section";const S=document.createElement("div");S.className="section-title",S.innerHTML="<span>⏱</span> Tiempo → Dinero",v.appendChild(S);const b=document.createElement("div");b.className="grid-2-col";const k=q({label:"Días",type:"number",placeholder:"0",id:"days-input"}),M=q({label:"Hora",type:"number",placeholder:"0",id:"hours-input"});b.appendChild(k),b.appendChild(M),v.appendChild(b);const $=P("Dinero generado","$ 0","Este es el valor de tu tiempo dedicado");$.classList.add("hidden");const z=()=>{const m=parseFloat(k.querySelector("input").value)||0,g=parseFloat(M.querySelector("input").value)||0;if(m>0||g>0){const E=(m*(o||8)+g)*s;$.querySelector(".result-value").textContent=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(E),$.classList.remove("hidden")}else $.classList.add("hidden")};return k.querySelector("input").addEventListener("input",z),M.querySelector("input").addEventListener("input",z),v.appendChild($),c.appendChild(v),l}function P(r,t,o){const a=document.createElement("div");return a.className="result-card",a.innerHTML=`
        <div class="result-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${r}
        </div>
        <div class="result-value">${t}</div>
        <div class="result-subtext">${o}</div>
    `,a}function K(){const r=document.createElement("div");return r.className="screen-container",r.innerHTML=`
        <h1 class="screen-title">WRAPPED</h1>
        <div class="card">
            <p class="text-center">Próximamente: Resumen Financiero</p>
        </div>
    `,r}function U(r="income"){const t=document.createElement("nav");t.className="navbar";const o={expenses:"theme-expenses",funds:"theme-funds",calculator:"theme-calculator",wrapped:"theme-wrapped",income:"theme-income"};return o[r]&&t.classList.add(o[r]),[{id:"expenses",label:"Gastos",icon:'<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />'},{id:"funds",label:"Fondos",icon:'<rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />'},{id:"calculator",label:"Calculadora",icon:'<rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="14" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="8" y1="14" x2="8" y2="14" /><line x1="16" y1="18" x2="16" y2="18" /><line x1="12" y1="18" x2="12" y2="18" /><line x1="8" y1="18" x2="8" y2="18" />'},{id:"wrapped",label:"Wrapped",icon:'<path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />'},{id:"income",label:"Ingresos",icon:'<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.07.9 2 2 2h4v-4h-4z" />'}].forEach(e=>{const n=document.createElement("button");n.className=`nav-item ${e.id===r?"active":""}`,n.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                ${e.icon}
            </svg>
            <span class="nav-label">${e.label}</span>
        `,n.onclick=()=>{const i=new CustomEvent("navigate",{detail:{screen:e.id}});document.dispatchEvent(i)},t.appendChild(n)}),t}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");let t="income";const o={expenses:W,funds:_,calculator:J,wrapped:K,income:G};function a(){r.innerHTML="";const n=(o[t]||o.income)();r.appendChild(n);const i=U(t);r.appendChild(i),t==="calculator"?document.body.style.overflowY="auto":(document.body.style.overflowY="hidden",window.scrollTo(0,0)),window.scrollTo(0,0)}a(),document.addEventListener("navigate",e=>{const n=e.detail.screen;n&&o[n]&&n!==t&&(t=n,a())})});
