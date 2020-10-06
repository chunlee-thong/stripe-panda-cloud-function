import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.app.admin.options);

exports.testing = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  res.send({ message: "This is testing" });
});

exports.sendNotificationToUser = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    var userId: string = req.query.id as string;
    if (userId == null) {
      res.send({ error: "No id provided" });
      return;
    }

    var payload: admin.messaging.MessagingPayload = {
      notification: {
        title: "Thank for purchasing",
        body: "Thank for purchasing from our app, we will delivery to you soon!",
        badge: "1",
        sound: "default",
        clickAction: "FLUTTER_NOTIFICATION_CLICK",
      },
    };
    admin
      .messaging()
      .sendToTopic(userId, payload)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  }
);
