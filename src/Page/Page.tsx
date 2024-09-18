import { NodeData } from "../utils/types"
import { useFocusedNodeIndex } from "./useFocusedNodeIndex"
import { Cover } from "./Cover"
import { Spacer } from "./Spacer"
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher"
import { Title } from "./Title"
import { nanoid } from "nanoid"
import { useAppState } from "../state/AppStateContext"

export const Page = () => {
    const { nodes, addNode, title, setTitle } = useAppState()
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

    const addNodeAtBottom = () => {
        const emptyNode: NodeData = { type: "text", id: nanoid(), value: "" }
        addNode(emptyNode, nodes.length)
    }

    return (
        <>
            <Cover />
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                {nodes.map((node, index) => (
                    <NodeTypeSwitcher
                        key={node.id}
                        node={node}
                        isFocused={focusedNodeIndex === index}
                        updateFocusedIndex={setFocusedNodeIndex}
                        index={index}
                    />
                ))}
                <Spacer
                    handleClick={addNodeAtBottom}
                    showHint={!nodes.length} />
            </div>
        </>
    )


}
