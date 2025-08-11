import {TreeItem} from "@/types";

import {Sidebar, SidebarContent, SidebarProvider, SidebarMenuSub, SidebarRail, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {ChevronRightIcon, FileIcon, FolderIcon} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

interface TreeViewProps {
    data:TreeItem[];
    value?: string | null;
    onSelect?: (value: string) => void;
}

export const TreeView = ({data, value, onSelect}: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="w-full">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.map((item, key)=>(
                                    <Tree key={key} item={item} selectedValue={value} onSelect={onSelect} parentPath="" />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        </SidebarProvider>
    );
}

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath: string;
}

const Tree = ({item, selectedValue, onSelect, parentPath}: TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;
    if(!items.length){
        const isSelected = selectedValue === currentPath;
        return (
            <SidebarMenuButton
                isActive={isSelected} className="data-[active=true]:bg-transparent"
                onClick={()=>onSelect?.(currentPath)}>
                <FileIcon className="size-4"/>
                <span className="truncate">{name}</span>
            </SidebarMenuButton>
        )
    }
    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90" defaultOpen={true}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRightIcon className="transition-transform"/>
                        <FolderIcon className="size-4"/>
                        <span className="truncate">{name}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.length>0 && items.map((subitem, index)=> (
                            <Tree key={index} item={subitem} selectedValue={selectedValue} onSelect={onSelect} parentPath={currentPath} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )

}