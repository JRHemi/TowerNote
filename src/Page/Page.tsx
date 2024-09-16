import { useState } from "react"
import { NodeData } from "../utils/types"
import { useFocusedNodeIndex } from "./useFocusedNodeIndex"
import { Cover } from "./Cover"
import { Spacer } from "./Spacer"
import { BasicNode } from "../Node/BasicNode"
import { Title } from "./Title"
import { nanoid } from "nanoid"

export const Page =() => {
    const [nodes, setNodes] = useState<NodeData[]>([])
    const [ title, setTitle ] = useState("Default Title")
    const  [ focusedNodeIndex, setFocusedNodeIndex ] = useFocusedNodeIndex({nodes})

    const spacerClick = () => {
        const emptyNode:NodeData = {type: "text", id: nanoid(), value: ""}
        addNode(emptyNode, nodes.length )
    }

    const addNode = (node: NodeData, index: number) => {
        const newNodes = [...nodes];
        newNodes.splice(index, 0, node)
        setNodes(newNodes)
    }

    const removeNodeByIndex = (index: number) => {
        const newNodes = [...nodes]
        newNodes.splice(index, 1)
        setNodes(newNodes)
    }

    const changeNodeValue = (index: number, value: string) => {
        const newNodes = [...nodes]
        newNodes[index].value = value
        setNodes(newNodes)
    }

    return(
        <>
        <Cover/>
        <div>
            <Title title={title} changePageTitle={setTitle} addNode={addNode} />
            {nodes.map((node, index) => (
                <BasicNode 
                key={node.id}
                node={node}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
                index={index}
                addNode={addNode}
                removeNodeByIndex={removeNodeByIndex}
                changeNodeValue={changeNodeValue}
                />
            ))}
            <Spacer handleClick={spacerClick} showHint={!nodes.length}/>
        </div>
        </>
    )


    }
