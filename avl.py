# ===================== ABERTURA =====================

class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1  


class AVLTree:

    # ===================== ESTRUTURA DO NÓ / ALTURA E BALANCEAMENTO =====================

    def get_height(self, node):
        if not node:
            return 0
        return node.height

    def get_balance(self, node):
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)

    # ===================== ROTAÇÕES =====================
    def rotate_right(self, y):
        x = y.left
        T2 = x.right

        x.right = y
        y.left = T2

        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))

        return x

    def rotate_left(self, x):
        y = x.right
        T2 = y.left

        y.left = x
        x.right = T2

        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))

        return y

    # ===================== INSERÇÃO =====================
   
    def insert(self, root, key):
        if not root:
            
            return Node(key)
        elif key < root.key:
            
            root.left = self.insert(root.left, key)
        else:
            
            root.right = self.insert(root.right, key)

        
        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))

       
        balance = self.get_balance(root)

       
        # caso LL
        if balance > 1 and key < root.left.key:
            return self.rotate_right(root)

        # caso RR
        if balance < -1 and key > root.right.key:
            return self.rotate_left(root)

        # caso LR
        if balance > 1 and key > root.left.key:
            root.left = self.rotate_left(root.left)
            return self.rotate_right(root)

        # caso RL
        if balance < -1 and key < root.right.key:
            root.right = self.rotate_right(root.right)
            return self.rotate_left(root)

        return root

    # ===================== MENOR VALOR (USADO NA REMOÇÃO) =====================
    def get_min_value_node(self, root):
        current = root
        while current.left:
            current = current.left
        return current

    # ===================== REMOÇÃO =====================

    def delete(self, root, key):
        if not root:
            return root

        # procura normal como numa BST
        if key < root.key:
            root.left = self.delete(root.left, key)
        elif key > root.key:
            root.right = self.delete(root.right, key)
        else:
           
            if not root.left:
                temp = root.right
                root = None
                return temp
            elif not root.right:
                temp = root.left
                root = None
                return temp

            
            temp = self.get_min_value_node(root.right)

            
            root.key = temp.key

            
            root.right = self.delete(root.right, temp.key)

        
        if not root:
            return root

        
        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))

       
        balance = self.get_balance(root)

        # ===================== REBALANCEAMENTO APÓS REMOVER =====================

        # caso EE
        if balance > 1 and self.get_balance(root.left) >= 0:
            return self.rotate_right(root)

        # caso ED
        if balance > 1 and self.get_balance(root.left) < 0:
            root.left = self.rotate_left(root.left)
            return self.rotate_right(root)

        # caso DD
        if balance < -1 and self.get_balance(root.right) <= 0:
            return self.rotate_left(root)

        # caso DE
        if balance < -1 and self.get_balance(root.right) > 0:
            root.right = self.rotate_right(root.right)
            return self.rotate_left(root)

        return root

    # ===================== EXIBIÇÃO =====================
    #só visual, pra ver a estrutura depois de operações
    def display(self, node, level=0, prefix="Raiz: "):
        if node:
            print(" " * (level * 4) + prefix + str(node.key))
            self.display(node.left, level + 1, "E--- ")
            self.display(node.right, level + 1, "D--- ")


# ===================== MENU =====================
def main():
    tree = AVLTree()
    root = None

    while True:
        print("\n===== MENU AVL =====")
        print("1 - Inserir valor")
        print("2 - Remover valor")
        print("3 - Mostrar árvore")
        print("0 - Sair")
        opc = input("Escolha: ")

        if opc == "1":
            val = int(input("Valor para inserir: "))
            root = tree.insert(root, val)
            print("valor inserido com balanceamento automático")
        elif opc == "2":
            val = int(input("Valor para remover: "))
            root = tree.delete(root, val)
            print("remoção feita, a árvore se ajustou sozinha")
        elif opc == "3":
            print("\nÁrvore AVL atual:")
            tree.display(root)
        elif opc == "0":
            break
        else:
            print("opção inválida")

if __name__ == "__main__":
    main()
