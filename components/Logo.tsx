import React from 'react';
import styles from "./Logo.module.scss"
import {twMerge} from "tailwind-merge"


type Props = {
  className?: string
}

const Logo = ({...props}: Props) => {
  return (
    <h3 className={twMerge(styles.logo, props.className)}>EDUDU</h3>
  );
};

export default Logo;