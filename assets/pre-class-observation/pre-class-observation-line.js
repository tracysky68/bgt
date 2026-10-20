/* Loaded only after the observation LIFF ID and official-menu entry are configured. */
window.BGT_OBSERVATION_LINE = (() => {
  let ready;
  const sent = new Set();
  const pending = new Map();
  function init() {
    if (!ready) ready = (async () => {
      const id = window.BGT_PRECLASS_CONFIG?.observationLiffId;
      if (!id || !window.liff) return false;
      await window.liff.init({ liffId: id });
      const context = window.liff.getContext();
      return window.liff.isInClient() && context?.type === 'utou' &&
        context.scope?.includes('chat_message.write');
    })().catch(() => false);
    return ready;
  }
  async function send(recordId, message, saved) {
    if (!saved) return { status: 'not-saved' };
    if (sent.has(recordId)) return { status: 'sent' };
    if (pending.has(recordId)) return pending.get(recordId);
    const operation = (async () => {
      if (!await init()) return { status: 'unavailable' };
      try {
        await window.liff.sendMessages([{ type: 'text', text: message }]);
        sent.add(recordId);
        return { status: 'sent' };
      } catch {
        // A failed call may have reached LINE. Never automatically retry it.
        return { status: 'unconfirmed' };
      }
    })();
    pending.set(recordId, operation);
    // Retain all outcomes for this record: duplicate events must not re-send.
    return operation;
  }
  return { init, send };
})();
