import { useDrop } from 'react-dnd';
import { useEditProjectTeamsMutation } from '../features/Project/projectApi';
import {
    type_backlog,
    type_blocked,
    type_doing,
    type_done,
    type_ready,
    type_review
} from '../utils/type';

export default function useDragDrop(type) {
    const [editProjectTeams] = useEditProjectTeamsMutation();

    const acceptType = [
        type_blocked,
        type_ready,
        type_backlog,
        type_doing,
        type_done,
        type_review
    ].filter((type_) => type_ !== type);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: acceptType,
        drop: (data) =>
            editProjectTeams({
                id: data.id,
                prevStage: data.stage,
                data: {
                    ...data,
                    stage: type
                }
            }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    return { isOver, drop };
}
