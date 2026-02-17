import React from "react";

function Modal({ user, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          {user.lastName} {user.firstName} {user.maidenName || ""}
        </h2>
        <p>Email: {user.email}</p>
        <p>Телефон: {user.phone}</p>
        <p>Возраст: {user.age}</p>
        <p>
          Адрес: {user.address?.country}, {user.address?.city}, {user.address?.address}
        </p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default Modal;
