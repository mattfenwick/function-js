import json


def node(next, key, value):
    return [next, key, value]


class List(object):

    def __init__(self, head=None):
        self.head = head
    
    def add(self, key, value):
        """
        overwrites existing key
        """
        if self.head is None:
            self.head = node(None, key, value)
        elif key < self.head[1]:
            self.head = node(self.head, key, value)
        elif key == self.head[1]:
            self.head[2] = value
        else:
            curr = self.head
            while curr[0] is not None:
                if key < curr[0][1]:
                    newE = node(curr[0], key, value)
                    curr[0] = newE
                    return
                elif key == curr[0][1]:
                    curr[0][2] = value
                    return
                curr = curr[0]
            # adding to end
            curr[0] = node(None, key, value)
    
    def remove(self, key):
        if self.head is None:
            pass
        elif self.head[1] == key:
            self.head = self.head[0]
        else:
            curr = self.head
            while curr[0] is not None:
                if key == curr[0][1]:
                    curr[0] = curr[0][0]
                    return
                curr = curr[0]
    
    def has(self, key):
        """
        this combines `has` and `get` functionality
        List -> Key -> (Boolean, Maybe Value)
        (was result found?, result -- or `None` if not found)
        """
        curr = self.head
        while curr is not None:
            if key < curr[1]: # optimization: allowable because list is sorted
                return (False, None)
            if curr[1] == key:
                return (True, curr[2])
            curr = curr[0]
        return (False, None)
    
    def elems(self):
        arr = []
        curr = self.head
        while curr is not None:
            arr.append((curr[1], curr[2]))
            curr = curr[0]
        return arr
    
    def toJSONObject(self):
        return {'type': 'List', 'elems': self.elems()}
    
    def __str__(self):
        return json.dumps(self.toJSONObject())
    
    def __repr__(self):
        return str(self)


l = List()
print l
for kv in [['hi', 4], ['bye', 22], ['quux', [8]], ['aar', 'me'], ['zar', 9]]:
    l.add(*kv)
    print l
print
for k in ['a', 'hi', 'dd', 'bye', 'mm', 'quux', 'zz']:
    print k, l.has(k)
#    print l
print
for k in ['a', 'his', 'dd', 'zar', 'bye', 'aar', 'mm']:
    l.remove(k)
    print l
print
for k in ['a', 'hi', 'dd', 'bye', 'mm', 'quux', 'zz', 'aar', 'zar']:
    print k, l.has(k)
for kv in [['hi', 14], ['bye', 122], ['quux', [81, 1]], ['aar', 'dummy me'], ['zar', 19], ['quux', -1], ['poops', 3]]:
    l.add(*kv)
    print l


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

