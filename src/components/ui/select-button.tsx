import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

type SelectableItem = {
  id: number;
  name: string;
};

type SelectButtonProps = {
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  elements: SelectableItem[];
  type: string;
};

export default function SelectButton({
  selectedElement,
  setSelectedElement,
  elements,
  type,
}: SelectButtonProps) {
  return (
    <Select value={selectedElement} onValueChange={setSelectedElement}>
      <SelectTrigger className="w-full mb-4">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectItem key="all" value="all">
          All {type}
        </SelectItem>
        {elements.map((element) => (
          <SelectItem key={element.id} value={element.name}>
            {element.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
