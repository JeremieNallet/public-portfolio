//folders
import LayoutInner from "../layout/LayoutInner";

const ProjectHead = ({ title, description }) => (
    <LayoutInner htmlString={description} title={title} />
);

export default ProjectHead;
