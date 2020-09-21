import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.app.admin.options);

exports.testing = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    res.json({ message: "This is testing" });
  }
);

exports.sendNotificationToUser = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    var userId: string = req.query.id as string;
    if (userId == null) {
      res.json({ error: "No id provided" });
      return;
    }

    const payload = {
      notification: {
        title: "Thank for purchasing",
        body:
          "Thank for purchasing from our app, we will delivery to you soon!",
        badge: "1",
        sound: "default",
        clickAction: "FLUTTER_NOTIFICAION_CLICK",
      },
    };
    admin
      .messaging()
      .sendToTopic(userId, payload)
      .then(() => {
        res.json({ message: "Send notification to user success" });
      })
      .catch((err) => res.json(err));
  }
);
