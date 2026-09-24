export type IconsId =
  | "whatsapp"
  | "team"
  | "smile"
  | "shield-check"
  | "send"
  | "phone"
  | "instagram"
  | "globe"
  | "facebook"
  | "error"
  | "email"
  | "clock"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "check-circle"
  | "calendar"
  | "building"
  | "arrow-up"
  | "arrow-right";

export enum Icons {
  Whatsapp = "whatsapp",
  Team = "team",
  Smile = "smile",
  ShieldCheck = "shield-check",
  Send = "send",
  Phone = "phone",
  Instagram = "instagram",
  Globe = "globe",
  Facebook = "facebook",
  Error = "error",
  Email = "email",
  Clock = "clock",
  ChevronRight = "chevron-right",
  ChevronLeft = "chevron-left",
  ChevronDown = "chevron-down",
  CheckCircle = "check-circle",
  Calendar = "calendar",
  Building = "building",
  ArrowUp = "arrow-up",
  ArrowRight = "arrow-right",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.Whatsapp]: "61697",
  [Icons.Team]: "61698",
  [Icons.Smile]: "61699",
  [Icons.ShieldCheck]: "61700",
  [Icons.Send]: "61701",
  [Icons.Phone]: "61702",
  [Icons.Instagram]: "61703",
  [Icons.Globe]: "61704",
  [Icons.Facebook]: "61705",
  [Icons.Error]: "61706",
  [Icons.Email]: "61707",
  [Icons.Clock]: "61708",
  [Icons.ChevronRight]: "61709",
  [Icons.ChevronLeft]: "61710",
  [Icons.ChevronDown]: "61711",
  [Icons.CheckCircle]: "61712",
  [Icons.Calendar]: "61713",
  [Icons.Building]: "61714",
  [Icons.ArrowUp]: "61715",
  [Icons.ArrowRight]: "61716",
};
