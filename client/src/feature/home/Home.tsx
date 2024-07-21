import React, { useState } from "react";
import { Tree } from "./components/tree/Tree";
import "./style.css";

export interface IData {
  id: number;
  name: string;
  children?: IData[];
}

export default function Home(): React.JSX.Element {
  const [showPreview, setShowPreview] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedId, setSelectedId] = useState();

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
  ];

  // const expanded = () => {
  //   setExpandedIds();
  // };

  // const selected = () => {
  //   setSelectedId();
  // };

  return (
    <div className="home">
      <div className="wrapper">
        <div className="col">
          <Tree
            items={data}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onExpand={() => {}}
            onSelect={() => {}}
          />
        </div>
        {/* <div className="col">
          <div className="icons">
            Примеры иконок:
            <Icon size="md" name="folder-close" />
            <Icon size="md" name="folder-open" />
            <Icon size="md" name="file" />
            <Icon size="md" name="tsx" />
            <Icon size="md" name="js" />
          </div>
          <div>
            <span
              className="preview-button"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Скрыть превью" : "Показать превью"}
            </span>
          </div>
          {showPreview && <img width={250} src="/example.gif" />}
        </div> */}
      </div>
    </div>
  );
}
