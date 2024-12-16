// import { NodeData } from "../utils/types"
// import { useSortable } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
// import { NodeTypeSwitcher } from "./NodeTypeSwitcher";
// import styles from "./NodeContainer.module.css"
//
// type NodeContainerProps = {
//     node: NodeData;
//     updateFocusedIndex(index: number): void;
//     isFocused: boolean;
//     index: number;
// }
//
// export const PageContainer = ({
//                                   node,
//                                   isFocused,
//                                   index,
//                                   updateFocusedIndex
//                               }: NodeContainerProps) => {
//
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//         id: node.id
//     })
//
//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition
//     }
//
//     return (
//         <div style={style} ref={setNodeRef} {...attributes} className={styles.container}>
//             <div {...listeners} className={styles.dragHandle}>
//                 🏢
//             </div>
//         </div>
//     )
// }