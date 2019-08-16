export default function addNotification() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      else if (Notification.permission === "granted") {
        if (document.hidden) {
         new Notification(
            "Бегом в чат! Есть непрочитанные сообщения!",
            {
              body: 'Чат ценителей JS',
              icon: 'https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png',
              requireInteraction: true
            }
          );
        }
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            if (document.hidden) {
              new Notification(
                "Бегом в чат! Есть непрочитанные сообщения!",
                {
                  body: `Чат ценителей JS`,
                  icon: 'https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png',
                  requireInteraction: true
                }
              );
            }
          }
        });
      }
    }