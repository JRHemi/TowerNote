// import {NodeData, Page, PageData} from "../utils/types"
// import { useFocusedNodeIndex } from "./useFocusedNodeIndex"
// import { Cover } from "./Cover"
// import { Spacer } from "./Spacer"
//
// import { Title } from "./Title"
// import { nanoid } from "nanoid"
// import { useAppState } from "../state/AppStateContext"
// import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
//
// import {PageContainer} from "./HomePageContainer.tsx";
// import {useEffect, useRef, useState} from "react";
// import {supabase} from "../supabaseClient.ts";
// import startPageScaffold from "../state/startPageScaffold.json";
//
// export const HomePage = () => {
//     const { nodes, addNode, title, setTitle, reorderNodes, cover, setCoverImage } = useAppState()
//     const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })
//     const [isLoading, setIsLoading] = useState(true);
//     const inProgress = useRef(false)
//     const [pages, setPages] = useState<[PageData[]]|[]>([])
//
//     const addNodeAtBottom = () => {
//         const emptyNode: NodeData = { type: "text", id: nanoid(), value: "" }
//         addNode(emptyNode, nodes.length)
//     }
//
//     const handleDragEvent = (event: DragEndEvent) => {
//         const {active, over} = event;
//         if (over?.id && active.id !== over?.id) {
//             reorderNodes(active.id as string, over.id as string)
//         }
//     }
//
//
//     useEffect(() => {
//         if (inProgress.current) {
//             return
//         }
//         setIsLoading(true);
//         inProgress.current = true
//         const fetchPages = async () => {
//             try {
//                 const { data: userData } = await supabase.auth.getUser();
//                 const user = userData.user;
//                 if (!user) {
//                     throw new Error("User is not logged in");
//                 }
//                 const { data } = await supabase
//                     .from("pages")
//                     .select("title, id, slug")
//                     .match({ created_by: user.id })
//
//                 if (data?.[0]) {
//                     setPages(data.?[0]);
//                     inProgress.current = false;
//                     setIsLoading(false);
//                     return
//                 }
//             } catch (e) {
//                 if (e instanceof Error) {
//                     setError(e);
//                 }
//             }
//             inProgress.current = false;
//             setIsLoading(false);
//         };
//         fetchPages();
//     }, [pageSlug]);
//
//
//     return (
//         <>
//             <Cover filePath={cover} changePageCover={setCoverImage} />
//             <div>
//                 <Title title={title} changePageTitle={setTitle} addNode={addNode} />
//                         {nodes.map((node, index) => (
//                             <PageContainer
//                                 key={node.id}
//                                 node={node}
//                                 isFocused={focusedNodeIndex === index}
//                                 updateFocusedIndex={setFocusedNodeIndex}
//                                 index={index}
//                             />
//                         ))}
//                     <
//                 <Spacer
//                     handleClick={addNodeAtBottom}
//                     showHint={!nodes.length} />
//             </div>
//         </>
//     )
// }