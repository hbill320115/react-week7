import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";


export default function Toast() {

  const messages = useSelector((state) => state.toast.messages);
  const toastRefs = useRef({});
  const dispatch = useDispatch();
    useEffect(()=>{
        messages.forEach((message)=>{
            const toastElemt = toastRefs.current[message.id];
            if(toastElemt){
                const toastInstance = new BsToast(toastElemt);
                toastInstance.show();
                setTimeout(()=>{
                    dispatch(removeMessage(message.id));
                },3000)
            }
        })
    },[messages])
  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        {messages.map((message) => {
            return(
                <div
                ref={(el)=>toastRefs.current[message.id]=el}
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                key={message.id}
              >
                <div
                  className={`toast-header bg-success text-white
                                                    ${
                                                      message.status === "success"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                    }`}
                >
                  <strong className="me-auto">
                    {message.status === "success" ? "成功" : "失敗"}
                  </strong>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body">{message.text}</div>
              </div>
            )
        })}
      </div>
    </>
  );
}
