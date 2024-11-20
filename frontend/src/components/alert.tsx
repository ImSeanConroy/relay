import { Info, CircleCheck, CircleAlert, CircleX } from "lucide-react";

type AlertType = {
  message: string;
  type: "info" | "success" | "warning" | "error";
};

const alertTypeMap: Record<string, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

const Alert = ({ message, type }: AlertType) => {
  return (
    <div role="alert" className={`alert ${alertTypeMap[type]} max-w-md`}>
      {type === "info" && <Info className="h-6 w-6 shrink-0 stroke-current" />}
      {type === "success" && (
        <CircleCheck className="h-6 w-6 shrink-0 stroke-current" />
      )}
      {type === "warning" && (
        <CircleAlert className="h-6 w-6 shrink-0 stroke-current" />
      )}
      {type === "error" && (
        <CircleX className="h-6 w-6 shrink-0 stroke-current" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
