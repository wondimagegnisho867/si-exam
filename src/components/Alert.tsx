import { Alert } from "@models/alert";

const Alert = ({ alert }: { alert: Alert | null }) => {
  return <>{alert && <div styles={{height:"14vh"}}>{alert?.message}</div>}</>;
};

export default Alert;
