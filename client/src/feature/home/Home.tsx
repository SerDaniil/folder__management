import React, { useState } from "react";
import { Tree } from "./components/tree/Tree";
import { iconSizes, TypeIconSize } from "./components/icon/Icon";
import "./styles.css";
import { Setting } from "public/icons";
export interface IData {
  id: number;
  name: string;
  children?: IData[];
}

export default function Home(): React.JSX.Element {
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIconSize, setSelectedIconSize] = useState<TypeIconSize>(
    iconSizes[0]?.label
  );

  const data: IData[] = [
    {
      id: 1,
      name: "node_modules",
      children: [
        {
          id: 2,
          name: "storybook",
          children: [
            {
              id: 3,
              name: "index.js",
            },
            {
              id: 4,
              name: "package.json",
            },
            {
              id: 5,
              name: "README.md",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "public",
      children: [
        {
          id: 7,
          name: "index.html",
        },
      ],
    },
    {
      id: 8,
      name: "src",
      children: [
        {
          id: 9,
          name: "App.tsx",
        },
        {
          id: 10,
          name: "index.tsx",
        },
      ],
    },
    {
      id: 11,
      name: "package.json",
    },
    {
      id: 12,
      name: "README.md",
    },
    {
      id: 13,
      name: "tsconfig.json",
    },
    {
      id: 14,
      name: "tsconfig.tsx",
    },
    {
      id: 15,
      name: "tsconfig.js",
    },
    {
      id: 16,
      name: "folder1",
      children: [
        {
          id: 17,
          name: "folder2",
          children: [
            {
              id: 18,
              name: "tsconfig.js",
            },
            {
              id: 19,
              name: "folder3",
              children: [
                {
                  id: 20,
                  name: "folder4",
                  children: [],
                },
              ],
            },
            {
              id: 21,
              name: "styles.css",
            },
          ],
        },
        {
          id: 22,
          name: "index.tsx",
        },
      ],
    },
  ];
  const handleExpand = (id: number, children?: IData[]): void => {
    const closeAllChildren = (
      nodeIds: number[],
      children?: IData[]
    ): number[] => {
      children?.forEach((child) => {
        const index = nodeIds.indexOf(child.id);
        if (index !== -1) {
          nodeIds.splice(index, 1);
        }
        if (child.children) {
          closeAllChildren(nodeIds, child.children);
        }
      });
      return nodeIds;
    };

    if (expandedIds.includes(id)) {
      let newExpandedIds = expandedIds.filter((itemId) => itemId !== id);
      if (children) {
        newExpandedIds = closeAllChildren(newExpandedIds, children);
      }
      setExpandedIds(newExpandedIds);
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleSelect = (id: number): void => {
    setSelectedId(id);
  };

  const handleOptionClick = (label: TypeIconSize): void => {
    setSelectedIconSize(label);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [showSetting, setShowSetting] = useState(false);

  const handleToggleOptions = () => {
    setIsOpen(!isOpen);

    setShowSetting(true);
    const timeout = setTimeout(() => {
      setShowSetting(false);
    }, 600);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="home">
      <div className="home__tree">
        <div className="tree__header">
          <p>client</p>
          <div
            className={`tree__header__setting ${showSetting ? "active" : ""}`}
          >
            <button
              type="button"
              className="setting__button"
              onClick={handleToggleOptions}
            >
              <Setting />
            </button>
          </div>
        </div>
        <div className="tree__container">
          <Tree
            items={data}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onExpand={handleExpand}
            onSelect={handleSelect}
            IconSize={selectedIconSize}
          />
        </div>
      </div>
      <div className="home__window">
        <div className="setting__options">
          {iconSizes &&
            isOpen &&
            iconSizes.map(({ label }, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOptionClick(label)}
              >
                {label}
              </button>
            ))}
        </div>
        {selectedId && selectedId}
      </div>
    </div>
  );
}
