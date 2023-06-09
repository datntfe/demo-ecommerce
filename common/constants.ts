import { EGender, EMaritalStatus } from 'common/enums';

/* eslint-disable no-useless-escape */
export const REGEX = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
  domain: /^[a-zA-Z0-9](?:[a-zA-Z0-9-.]*[a-zA-Z0-9])?$/i,
  alphabetic: /^[a-z\s]+$/i,
  alphanumerial: /^[a-z0-9\s]+$/i,
  numeric: /^\d+$/i,
  onlySpecialKey: /[$&+,:;=?@#|'<>.^*()%`~_!\-"\]\[\\}{'/]/g,
};

export const localeName = {
  ViVN: 'vi-VN',
  EnUS: 'en-US',
};

export const dataGenderOptions = [
  { value: EGender.MALE, label: 'Male' },
  { value: EGender.FEMALE, label: 'Female' },
];

export const dataMaritalStautusOptions = [
  { value: EMaritalStatus.SINGLE, label: 'Single' },
  { value: EMaritalStatus.MARRIED, label: 'Married' },
  { value: EMaritalStatus.DIVORCED, label: 'Divorced' },
  { value: EMaritalStatus.WINDOWED, label: 'Windowed' },
];
