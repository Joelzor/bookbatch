import CreatableSelect from "react-select/creatable";
import { Stack, Badge } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import tagOptions from "../data/tag-options";
import { AiFillTags } from "react-icons/ai";
import "../styles/batch.css";

const CreateTags = ({ editing = false }) => {
  const { localTags, setLocalTags } = useBatchContext();

  return (
    <Stack className="mt-4" style={{ width: "80%" }}>
      <h5 className="create-heading">
        <AiFillTags className="create-icon" />
        Tags
      </h5>
      <p>
        Mix and match tags- select default or start typing to create your own
      </p>
      {!editing && (
        <CreatableSelect
          isMulti
          options={tagOptions.map((tag) => {
            return { label: tag.title, value: tag.title };
          })}
          onChange={(tags) => {
            setLocalTags(
              tags.map((tag) => {
                return { label: tag.label };
              })
            );
          }}
        />
      )}
      {editing && (
        <CreatableSelect
          isMulti
          value={
            editing &&
            localTags.map((tag) => {
              return {
                label: tag.title || tag.label,
                value: tag.title || tag.label,
              };
            })
          }
          options={tagOptions.map((tag) => {
            return { label: tag.title, value: tag.title };
          })}
          onChange={(tags) => {
            setLocalTags(
              tags.map((tag) => {
                return { label: tag.label };
              })
            );
          }}
        />
      )}
      <Stack direction="horizontal" gap={2} className="mt-3">
        {localTags.map((tag, index) => {
          return (
            <Badge key={index} bg="secondary">
              {tag.label}
            </Badge>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default CreateTags;
