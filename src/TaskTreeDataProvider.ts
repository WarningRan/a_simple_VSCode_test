import { TreeDataProvider, EventEmitter, Event } from "vscode";
import { Info } from "./Info";
import { TaskTreeItem } from "./TaskTreeItem";


export class TaskTreeDataProvider implements TreeDataProvider<Info> {
  getChildren() {
    console.log("getChildren");

    const f1 = new Info("task1", "任务1 删除注释");
    const f2 = new Info("task2", "任务2 输出前两行");
    const f3 = new Info("task3", "任务3 拷贝当前文件");

    return [f1, f2, f3];
  }
  // 光标在上面浮窗返回Info内容？-lzr
  getTreeItem(element: Info) {
    // console.log("getTreeItem");
    var treeItem = new TaskTreeItem(element);

    return treeItem;
  }

}