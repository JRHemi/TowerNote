import { Page, NodeData, NodeType } from "../utils/types"
import { useImmer } from "use-immer"

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
        setCoverImage
    }
}