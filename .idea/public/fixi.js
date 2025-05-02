(() => {
  if (document.__fixi_mo) return;
  document.__fixi_mo = new MutationObserver((recs) =>
    recs.forEach(
      (r) => r.type === "childList" && r.addedNodes.forEach((n) => process(n))
    )
  );
  let send = (elt, type, detail, bub) =>
    elt.dispatchEvent(
      new CustomEvent("fx:" + type, {
        detail,
        cancelable: true,
        bubbles: bub !== false,
        composed: true,
      })
    );
  let attr = (elt, name, defaultVal) => elt.getAttribute(name) || defaultVal;
  let ignore = (elt) => elt.closest("[fx-ignore]") != null;
  let init = (elt) => {
    let options = {};
    if (elt.__fixi || ignore(elt) || !send(elt, "init", { options })) return;
    elt.__fixi = async (evt) => {
      let reqs = (elt.__fixi.requests ||= new Set());
      let form = elt.form || elt.closest("form");
      let body = new FormData(form ?? undefined, evt.submitter);
      if (!form && elt.name) body.append(elt.name, elt.value);
      let ac = new AbortController();
      let cfg = {
        trigger: evt,
        action: attr(elt, "fx-action"),
        method: attr(elt, "fx-method", "GET").toUpperCase(),
        target: document.querySelector(attr(elt, "fx-target")) ?? elt,
        swap: attr(elt, "fx-swap", "innerHTML"),
        body,
        abort: ac.abort.bind(ac),
        signal: ac.signal,
        transition: document.startViewTransition?.bind(document),
        fetch: fetch.bind(window),
      };
      reqs.add(cfg);
      try {
        cfg.response = await cfg.fetch(cfg.action, cfg);
        cfg.text = await cfg.response.text();
      } catch (error) {
        // pass for now
      } finally {
        // pass for now
      }
      let doSwap = () => {
        const reactNode = window.ReactDOM.createRoot(cfg.target).render(
          cfg.text
        );
        window.ReactDOM.hydrateRoot(cfg.target, reactNode);
      };
      await cfg.transition(doSwap).finished;
    };
    elt.__fixi.evt = attr(
      elt,
      "fx-trigger",
      elt.matches("form")
        ? "submit"
        : elt.matches("input:not([type=button]),select,textarea")
        ? "change"
        : "click"
    );
    elt.addEventListener(elt.__fixi.evt, elt.__fixi, options);
  };
  let process = (n) => {
    if (n.matches) {
      if (ignore(n)) return;
      if (n.matches("[fx-action]")) init(n);
    }
    if (n.querySelectorAll) n.querySelectorAll("[fx-action]").forEach(init);
  };
  //   document.addEventListener("fx:process", (evt) => process(evt.target));
  document.addEventListener("DOMContentLoaded", () => {
    document.__fixi_mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    process(document.body);
  });
})();

console.log("fixi.js loaded");
