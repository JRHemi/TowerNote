import { useState, useEffect } from "react";
import { NodeType } from "../utils/types"
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css"
import cx from "classnames"

type CommandPanelProps = {
    nodeText: string;
    selectItem: (nodeType: NodeType) => void;
}

type SupportedNodeType = {
    value: NodeType;
    name: string;
}

const SupportedNodeTypes: SupportedNodeType[] = [
    { value: "text", name: "Text" },
    { value: "list", name: "List" },
    { value: "heading1", name: "Heading 1" },
    { value: "heading2", name: "Heading 2" },
    { value: "heading3", name: "Heading 3" }
]

export const CommandPanel = ({ selectItem, nodeText }: CommandPanelProps) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const { overflows, ref } = useOverflowsScreenBottom()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                selectItem(SupportedNodeTypes[selectedItemIndex].value)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [selectedItemIndex, selectItem])


    useEffect(() => {
        const normailizedValue = nodeText.toLowerCase().replace(/\//, "")
        setSelectedItemIndex(
            SupportedNodeTypes.findIndex(item => item.value.match(normailizedValue))
        )
    }, [nodeText])

    return (
        <div ref={ref}
            className={
                cx(styles.panel, {
                    [styles.reverse]: overflows,
                })
            }
        >
            <div className={styles.title}>Blocks</div>
            <ul>
                {SupportedNodeTypes.map((type, index) => {
                    const selected = selectedItemIndex === index;

                    return (
                        <li
                            key={type.value}
                            className={
                                cx({
                                    [styles.selected]: selected
                                })
                            }
                            onClick={() => selectItem(type.value)}
                        >{type.name}</li>
                    )
                })}
            </ul>
        </div>
    )

}