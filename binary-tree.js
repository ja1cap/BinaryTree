'use strict';

class BinaryTree {

  constructor() {
    this.root = null;
  }

  insert(data) {

    //Создаем новый объект для записи данных.
    var node = new Node(data),
    //будет использоваться для проссмотра бинарного дерева
      current;

    // Ситуация, когда бинарное дерево пустое.
    if (this.root === null) {
      this.root = node;
    } else {
      current = this.root;

      while (true) {

        //Ситуация, когда значение 'data' объекта меньше значения 'data' текущего узла. Спускаемся вниз влево.
        if (data < current.data) {

          // Если далее слева узла не найдено, присваиваем значение 'data' текущему узлу.
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }

        }
        //Ситуация, когда значение 'data' объекта больше значения 'data' текущего узла. Спускаемся вниз вправо.
        else if (data > current.data) {

          // Если далее справа узла не найдено, присваиваем значение 'data' текущему узлу.
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }

        }
        // Если новое значение 'data' равно текущему значению 'data' - применяем 'break'
        else {
          break;
        }
      }
    }

  }

  contains(data) {
    var found = false,
      current = this.root;

    // Нужно убедиться, что существует узел для поиска.
    while (!found && current) {

      //Если значение 'data' объекта меньше значения 'data' текущего узла - спускаемся вниз влево.
      if (data < current.data) {
        current = current.left;
      }
      // Если значение 'data' объекта больше значения 'data' текущего узла - спускаемся вниз вправо.
      else if (data > current.data) {
        current = current.right;
      }
      // Если новое значение 'data' равно текущему значению 'data' - значит мы нашли нужное!
      else {
        found = true;
      }
    }

    // Двигаемся далее, при условии что узел найден.
    return found;
  }

  remove(data) {

    var found = false,
      parent = null,
      current = this.root,
      childCount,
      replacement,
      replacementParent;

    // Убеждаемся что бинарное дерево содержит узел для поиска
    while (!found && current) {

      // Если значение 'data' объекта меньше значения 'data' текущего узла - спускаемся вниз влево
      if (data < current.data) {
        parent = current;
        current = current.left;

      }
      // Если значение 'data' объекта больше значения 'data' текущего узла - спускаемся вниз вправо.
      else if (data > current.data) {
        parent = current;
        current = current.right;
      }
      // Если новое значение 'data' равно текущему значению 'data' - значит мы нашли нужное!
      else {
        found = true;
      }
    }

    // Двигаемся далее, при условии что узел найден.
    if (found) {

      // Выесняем сколько дочерних узлов (children)
      childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

      // Если 'data' является корневым знаечием
      if (current === this.root) {
        switch (childCount) {

          // Детей нет - удаляем корневое значение

          case 0:
            this.root = null;
            break;

          // Один ребенок (left or right)- назначаем его в корневое значение

          case 1:
            this.root = (current.right === null ? current.left : current.right);
            break;

          // Если два ребенка
          case 2:

            // Предположим, что новым корневым значением станет левый ребенок старого корневого значения

            replacement = this.root.left;

            // Ищем последний правый узел без детей, который может стать корневым (find the right-most leaf node to be the real new root).
            //!!!!!!!!!!!!!!!!!!!!

            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            //it's not the first node on the left
            if (replacementParent !== null) {

              //remove the new root from it's previous position
              replacementParent.right = replacement.left;

              //give the new root all of the old root's children
              replacement.right = this.root.right;
              replacement.left = this.root.left;
            } else {

              //just assign the children
              replacement.right = this.root.right;
            }

            //officially assign new root
            this.root = replacement;

          //no default

        }

        // значение не корневое //non-root data
      } else {

        switch (childCount) {

          //no children, just remove it from the parent
          case 0:
            //если текущее data меньше значения parent's - parent.left = null  //if the current data is less than its parent's, null out the left pointer
            if (current.data < parent.data) {
              parent.left = null;
            }
            // если текущее data больше значения parent's - parent.right = null //if the current data is greater than its parent's, null out the right pointer
            else {
              parent.right = null;
            }
            break;

          //Один child  - переназначить parent
          case 1:
            //if the current data is less than its parent's, reset the left pointer
            if (current.data < parent.data) {
              parent.left = (current.left === null ? current.right : current.left);
            }
            //if the current data is greater than its parent's, reset the right pointer
            else {
              parent.right = (current.left === null ? current.right : current.left);
            }
            break;

          //two children, a bit more complicated
          case 2:

            //reset pointers for new traversal
            replacement = current.left;

            //find the right-most node
            while (replacement.right !== null) {
              replacement = replacement.right;
            }

            //assign children to the replacement
            replacement.right = current.right;

            //place the replacement in the right spot
            if (current.data < parent.data) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }

          //no default


        }

      }

    }

  }

  size() {
    var length = 0;

    function traverse(node) {

      if (node && typeof node.left !== 'undefined') {

        length++;

        if (node.left !== null && typeof node.left !== 'undefined') {
          traverse(node.left);
        }

        if (node.right !== null && typeof node.right !== 'undefined') {
          traverse(node.right);
        }
      }

    }

    traverse(this.root);

    return length;
  }

  isEmpty() {
    return this.root === null;
  }
}
