import React from "react";
import { store } from "react-notifications-component";
import './notif.css'

const notificationMessage = (message) => {
  return Array.isArray(message) ? (
    <ul style={{ paddingLeft: "12px" }}>
      {message.map((value) => (
        <li>{value}</li>
      ))}
    </ul>
  ) : (
    <div>
      <p>{message}</p>
    </div>
  );
};

const notifAlert = (type, title, message) => {
  store.addNotification({
    title: title,
    message: notificationMessage(message),
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
  });
};

export const popSuccessAlert = (title, message) => {
  notifAlert("success", title, message);
};

export const popErrorAlert = (title, message) => {
  notifAlert("danger", title, message);
};

export const popWarningAlert = (title, message) => {
  notifAlert("warning", title, message);
};
