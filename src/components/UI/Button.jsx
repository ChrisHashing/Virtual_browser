import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size,
  outline = false,
  icon = false,
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    outline ? styles.outline : styles[variant],
    outline ? styles[`outline${variant.charAt(0).toUpperCase() + variant.slice(1)}`] : '',
    size ? styles[size] : '',
    icon ? styles.icon : '',
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;