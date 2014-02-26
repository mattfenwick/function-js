import json


class Node(object):
    
    def __init__(self, next, value):
        self.next = next
        self.value = value
    
    def add(self, value):
        return Node(self, value)
    
    def remove(self, pred):
        if pred(self.value):
            return self.next
        if self.next is None:
            return self
        return self.next.remove(pred)
    
    def has(self, pred):
        if pred(self.value):
            return True
        if self.next is None:
            return False
        return self.next.has(pred)


class List(object):

    def __init__(self, head=None):
        self.head = head
    
    def add(self, value):
        if self.head is None:
            self.head = Node(None, value)
        else:
            self.head = self.head.add(value)
    
    def remove(self, pred):
        if self.head is None:
            pass
        else:
            self.head = self.head.remove(pred)
    
    def has(self, pred):
        if self.head is None:
            return False
        else:
            return self.head.has(pred)
    
    def elems(self):
        arr = []
        curr = self.head
        while curr is not None:
            arr.append(curr.value)
            curr = curr.next
        return arr
    
    def toJSONObject(self):
        return {'type': 'List', 'elems': self.elems()}
    
    def __str__(self):
        return json.dumps(self.toJSONObject())
    
    def __repr__(self):
        return str(self)


class Hash(object):

    def __init__(self, array_size=10):
        self._elems = [None] * array_size
    
    def _hash(self, key):
        return hash(key) % len(self._elems)
    
    def resize(self):
        pass
    
    def add(self, key, value):
        # 1. need to resize?
        # 2. find bucket
        # 3. add to bucket
        self.resize()
        bucket_index = self._hash(key)
        if self._elems[bucket_index] is None:
            self._elems[bucket_index] = List()
        self._elems[bucket_index].add((key, value))
    
    def get(self, key):
        ix = self._hash(key)
        val = self._elems[ix].get(lambda pair: pair[0] == key)
        if val is not None:
            return val[1]
        raise ValueError('missing key -- %s' % str(key))
    
    def remove(self, key):
        pass
    
    def has(self, key):
        bucket_index = self._hash(key)
        if self._elems[bucket_index] is None:
            return False
        return self._elems[bucket_index].has(lambda pair: pair[0] == key)
    
    def toJSONObject(self):
        return {'type': 'Hash', 'buckets': [e if e is None else e.toJSONObject() for e in self._elems]}
        
    def __str__(self):
        return json.dumps(self.toJSONObject())

    def __repr__(self):
        return str(self)

