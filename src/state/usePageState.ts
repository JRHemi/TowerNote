import { Page, NodeData, NodeType } from "../utils/types"
import { useImmer } from "use-immer"
import { arrayMove } from "@dnd-kit/sortable"

export const usePageState = (initialState: Page) => {
    const [page, setPage] = useImmer<Page>(initialState);

    const addNode = (node: NodeData, index: number):void => {
        setPage((draft) => {draft.nodes.splice(index, 0, node)})
    }

    const removeNodeByIndex = (nodeIndex: number):void => {
        setPage((draft) => {draft.nodes.splice(nodeIndex, 1)})
    }

    const changeNodeValue = (nodeIndex: number, value: string):void => {
        setPage((draft) => {draft.nodes[nodeIndex].value = value})
    }

    const changeNodeType = (nodeIndex: number, nodeType: NodeType):void => {
        setPage((draft) => {
            draft.nodes[nodeIndex].type = nodeType;
            draft.nodes[nodeIndex].value = '';
        })
    }

    const setNodes = (nodes: NodeData[]):void => {
        setPage((draft) => {
            draft.nodes.splice(0, draft.nodes.length, ...nodes);
        } )
    }

    const setTitle = (title: string):void => {
        setPage((draft) => {draft.title = title})
    }

    const setCoverImage = (imageUrl: string):void => {
        setPage((draft) => {draft.cover = imageUrl})
    }


    const reorderNodes = (id1:string, id2:string) => {
        setPage((draft) => {
            const index1 = draft.nodes.findIndex(node => node.id === id1)
            const index2 = draft.nodes.findIndex(node => node.id === id2)
            draft.nodes = arrayMove(draft.nodes, index1, index2)
        })
    } 

    return {
        nodes: page.nodes,
        title: page.title,
        cover: page.cover,
        changeNodeType,
        changeNodeValue,
        addNode,
        removeNodeByIndex,
        setNodes,
        setTitle,
        setCoverImage,
        reorderNodes
    }
}