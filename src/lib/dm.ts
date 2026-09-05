/* Instagram не умеет подставлять текст в DM: параметра для этого нет.
   Поэтому копируем сообщение в буфер и открываем диалог - артисту остаётся
   вставить и отправить. Копирование должно случиться в том же клике, иначе
   Safari считает вызов буфера несанкционированным и блокирует его. */

export const IG = 'https://ig.me/m/shileforyou';

export async function askOnInstagram(message: string) {
  try {
    await navigator.clipboard.writeText(message);
  } catch {
    /* Буфер может быть недоступен (нет https, старый браузер, отказ в правах).
       Диалог всё равно открываем: пустая личка лучше, чем ничего. */
  }
  window.open(IG, '_blank', 'noopener,noreferrer');
}

/* Открыть почтовое приложение, а не сайт.
   iOS понимает схему googlegmail://, Android - intent://.
   Если приложения нет, схема молча не срабатывает, поэтому через секунду
   уводим на веб-версию. */
export function openMailApp(webUrl: string, appUrl?: string) {
  if (!appUrl) { window.open(webUrl, '_blank', 'noopener,noreferrer'); return; }
  const isAndroid = /android/i.test(navigator.userAgent);
  const isMobile = isAndroid || /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (!isMobile) { window.open(webUrl, '_blank', 'noopener,noreferrer'); return; }

  const started = Date.now();
  const fallback = window.setTimeout(() => {
    /* Если приложение открылось, вкладка ушла в фон и таймер отработает
       с большой задержкой - значит на веб уводить уже не надо. */
    if (Date.now() - started < 1600 && !document.hidden) {
      window.location.href = webUrl;
    }
  }, 1200);

  const onHide = () => window.clearTimeout(fallback);
  document.addEventListener('visibilitychange', onHide, { once: true });
  window.location.href = appUrl;
}
