import { FC } from "react";
import cn from "classnames";
import { File, FolderClose, FolderOpen, Js, TSX } from "public/icons";
import styles from "./styles.css";

export type IconName = "file" | "folder-close" | "folder-open" | "js" | "tsx";
type IconSize = "sm" | "md";

export const icons: Record<IconName, FC> = {
  file: File,
  "folder-close": FolderClose,
  "folder-open": FolderOpen,
  js: Js,
  tsx: TSX,
};

console.log(styles);

const iconSizes: Record<IconSize, string> = {
  sm: styles.sm,
  md: styles.md,
};

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, size = "sm", className }) => {
  const IconComponent = icons[name];

  return IconComponent ? (
    <span className={cn(styles.icon, iconSizes[size], className)}>
      <IconComponent />
    </span>
  ) : null;
};
