// src/utils/mailer.js
import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config/index.js';

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

export const sendMail = ({ to, subject, html }) =>
  transporter.sendMail({ from: EMAIL_CONFIG.auth.user, to, subject, html });
