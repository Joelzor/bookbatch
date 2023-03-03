import CreatableSelect from "react-select/creatable";
import { Stack } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import tagOptions from "../data/tag-options";

const CreateTags = () => {
  const { localTags, setLocalTags } = useBatchContext();

  return (
    <Stack className="mt-4" style={{ width: "80%" }}>
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
      <Stack direction="horizontal" gap={2}></Stack>
    </Stack>
  );
};

export default CreateTags;
