import type { FC } from "react";
import { Icon, IconName, icons } from "../icon/Icon";
import { IData } from "../../Home";
// import styles from "./styles.css";

interface TreeProps {
  items: IData[];
  expandedIds: IData[];
  selectedId: any;
  onSelect: (args: any) => void;
  onExpand: (args: any) => void;
}

export const Tree: FC<TreeProps> = ({
  items,
  expandedIds,
  selectedId,
  onSelect,
  onExpand,
}) => {
  function openClose(id: number): void {
    onSelect(id);
  }

  function toIconName(name: string): IconName {
    const extension = name.split(".")[1];
    const result =
      (extension || "folder-close") in icons
        ? ((extension || "folder-close") as IconName)
        : "file";

    return result;
  }

  // console.log(styles);

  return (
    <div>
      {items.length &&
        items.map(({ name, id }) => (
          <div key={id}>
            <button
              type="button"
              onClick={() => {
                openClose(id);
              }}
            >
              <Icon name={toIconName(name)} size="md" />
            </button>
            {name}
          </div>
        ))}
    </div>
  );
};
