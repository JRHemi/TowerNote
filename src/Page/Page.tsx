import { NodeData } from "../utils/types"
import { useFocusedNodeIndex } from "./useFocusedNodeIndex"
import { Cover } from "./Cover"
import { Spacer } from "./Spacer"
import { NodeContainer } from "../Node/NodeContianer"
import { Title } from "./Title"
import { nanoid } from "nanoid"
import { useAppState } from "../state/AppStateContext"
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

export const Page = () => {
    const { nodes, addNode, title, setTitle, reorderNodes, cover, setCoverImage } = useAppState()
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

    const addNodeAtBottom = () => {
        const emptyNode: NodeData = { type: "text", id: nanoid(), value: "" }
        addNode(emptyNode, nodes.length)
    }

    const handleDragEvent = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over?.id && active.id !== over?.id) {
            reorderNodes(active.id as string, over.id as string)
        }
    }

    return (
        <>
            <Cover filePath={cover} changePageCover={setCoverImage} />
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                <DndContext onDragEnd={handleDragEvent}>
                    <SortableContext
                        items={nodes}
                        strategy={verticalListSortingStrategy}
                    >
                        {nodes.map((node, index) => (
                            <NodeContainer
                                key={node.id}
                                node={node}
                                isFocused={focusedNodeIndex === index}
                                updateFocusedIndex={setFocusedNodeIndex}
                                index={index}
                            />
                        ))}
                    </SortableContext>
                    <DragOverlay/>
                </DndContext>
                <Spacer
                    handleClick={addNodeAtBottom}
                    showHint={!nodes.length} />
            </div>
        </>
    )


}
