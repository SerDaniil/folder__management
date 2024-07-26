import { FC } from "react";
import cn from "classnames";
import {
  File,
  FolderClose,
  FolderOpen,
  JS,
  JSON,
  TSX,
  CSS,
} from "public/icons";
import styles from "./styles.module.css";

export type IconName =
  | "file"
  | "folder-close"
  | "folder-open"
  | "js"
  | "json"
  | "tsx"
  | "css";

export const icons: Record<IconName, FC> = {
  file: File,
  "folder-close": FolderClose,
  "folder-open": FolderOpen,
  js: JS,
  json: JSON,
  tsx: TSX,
  css: CSS,
};

export type TypeIconSize = "Small" | "Medium" | "Large";

interface IconSizes {
  value: string;
  label: TypeIconSize;
}

export const iconSizes: IconSizes[] = [
  { value: styles.sm, label: "Small" },
  { value: styles.md, label: "Medium" },
  { value: styles.lr, label: "Large" },
];

interface IconProps {
  name: IconName;
  size?: TypeIconSize;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, size, className }) => {
  const IconComponent = icons[name];
  const { value } = iconSizes.find((item) => item.label === size);

  return IconComponent ? (
    <span className={cn(styles.icon, value, className)}>
      <IconComponent />
    </span>
  ) : null;
};
