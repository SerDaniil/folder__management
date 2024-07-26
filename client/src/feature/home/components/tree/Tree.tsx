import { type FC } from "react";
import { Icon, IconName, icons, TypeIconSize } from "../icon/Icon";
import { IData } from "../../Home";
import "./styles.css";

interface TreeProps {
  items: IData[];
  expandedIds: number[];
  selectedId: number;
  onSelect: (id: number) => void;
  onExpand: (id: number, children?: IData[]) => void;
  IconSize: TypeIconSize;
}

export const Tree: FC<TreeProps> = ({
  items,
  expandedIds,
  selectedId,
  onSelect,
  onExpand,
  IconSize,
}) => {
  function handleExpanded(id: number, children?: IData[]): void {
    onExpand(id, children);
  }

  function handleSelected(id: number): void {
    onSelect(id);
  }

  function toIconName({ name, id, children }: IData): IconName {
    const extension = name.split(".")[1];
    const isFolder = !!children;
    const result = isFolder
      ? expandedIds.includes(id)
        ? "folder-open"
        : "folder-close"
      : extension in icons
      ? (extension as IconName)
      : "file";

    return result;
  }

  return (
    <>
      {items.length &&
        items.map(({ name, id, children }) => (
          <div key={id}>
            <div className="tree__component">
              <button
                type="button"
                onClick={() => {
                  if (children) {
                    handleExpanded(id, children);
                  }
                }}
              >
                <Icon
                  name={toIconName({ name, id, children })}
                  size={IconSize}
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelected(id);
                }}
              >
                {name}
              </button>
            </div>

            {expandedIds.includes(id) && children && children.length > 0 && (
              <div className="tree__expanded">
                <Tree
                  items={children}
                  expandedIds={expandedIds}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  onExpand={onExpand}
                  IconSize={IconSize}
                />
              </div>
            )}
          </div>
        ))}
    </>
  );
};
