import { FC, ReactNode } from "react";
import buttonStyle from "~/css/common/Button.css";

type Props = {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
};

const Button: FC<Props> = ({
  onClick = undefined,
  children,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} className={buttonStyle} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
