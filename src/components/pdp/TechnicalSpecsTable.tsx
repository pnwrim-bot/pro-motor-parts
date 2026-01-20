import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Specification {
  label: string;
  value: string;
  highlight?: boolean;
}

interface TechnicalSpecsTableProps {
  specifications: Specification[];
}

const TechnicalSpecsTable = ({ specifications }: TechnicalSpecsTableProps) => {
  return (
    <div className="card-industrial overflow-hidden">
      <div className="bg-secondary px-4 py-3 border-b border-border">
        <h3 className="font-bold text-foreground">Technical Specifications</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 font-semibold">Specification</TableHead>
            <TableHead className="font-semibold">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specifications.map((spec, index) => (
            <TableRow key={index} className={spec.highlight ? "bg-primary/5" : ""}>
              <TableCell className="font-medium text-muted-foreground">
                {spec.label}
              </TableCell>
              <TableCell className={`font-mono ${spec.highlight ? "text-primary font-semibold" : "text-foreground"}`}>
                {spec.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TechnicalSpecsTable;
