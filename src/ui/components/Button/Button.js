import $ from './Button.module.css';
import cx from 'classnames';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
        [$.dark]: variant === "dark",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
