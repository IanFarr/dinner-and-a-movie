import * as React from 'react';
import styles from '@/app/page.module.css';

function InputError({ message }: { message: string }) {
  return <div className={styles.InputError}>{message}</div>;
}