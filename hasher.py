import json


def node(next, key, value):
    return [next, key, value]


class List(object):

    def __init__(self, head=None):
        self.head = head
    
    def add(self, key, value):
        """
        overwrites existing key
        True if key added, False if key already found (and associated value updated)
        """
        if self.head is None:
            self.head = node(None, key, value)
            return True
        elif key < self.head[1]:
            self.head = node(self.head, key, value)
            return True
        elif key == self.head[1]:
            self.head[2] = value
            return False
        else:
            curr = self.head
            while curr[0] is not None:
                if key < curr[0][1]:
                    newE = node(curr[0], key, value)
                    curr[0] = newE
                    return True
                elif key == curr[0][1]:
                    curr[0][2] = value
                    return False
                curr = curr[0]
            # adding to end
            curr[0] = node(None, key, value)
            return True
    
    def remove(self, key):
        """
        True if key found (and removed)
        False if key not found
        """
        if self.head is None:
            return False
        elif self.head[1] == key:
            self.head = self.head[0]
            return True
        else:
            curr = self.head
            while curr[0] is not None:
                if key == curr[0][1]:
                    curr[0] = curr[0][0]
                    return True
                curr = curr[0]
            return False
    
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

    def __init__(self, pairs=[], table_size=10, threshold=0.75):
        if table_size < 1:
            raise ValueError('table_size must be >= 1')
        if threshold <= 0:
            raise ValueError('threshold must be positive')
        self._threshold = 0.75
        self._init_table(table_size, pairs)
    
    def _hash(self, key):
        return hash(key) % len(self._elems)
    
    def _init_table(self, table_size, pairs):
        self._elems = [None] * table_size
        self._size = 0
        for (k, v) in pairs:
            self.add(k, v, False)
            
    def resize(self):
        if len(self._elems) * self._threshold < self._size:
            elems = self.elems()
            self._init_table(2 * len(self._elems), elems)
        else:
            pass # nothing to do
    
    def add(self, key, value, allow_resize=True):
        # 1. need to resize?
        # 2. find bucket
        # 3. add to bucket
        if allow_resize: # kind of a hack
            self.resize()
        bucket_index = self._hash(key)
        if self._elems[bucket_index] is None:
            self._elems[bucket_index] = List()
        if self._elems[bucket_index].add(key, value):
            self._size += 1
    
    def remove(self, key):
        bucket_index = self._hash(key)
        if self._elems[bucket_index] is None:
            return False
        removed = self._elems[bucket_index].remove(key)
        if removed:
            self._size -= 1
        return removed
    
    def _has(self, key):
        bucket_index = self._hash(key)
        if self._elems[bucket_index] is None:
            return (False, None)
        return self._elems[bucket_index].has(key)
    
    def has(self, key):
        (has_key, val) = self._has(key)
        return has_key
    
    def get(self, key):
        (has_key, val) = self._has(key)
        if has_key:
            return val
        raise KeyError('missing key: %s' % str(key))
    
    def elems(self):
        arr = []
        for elem in self._elems:
            if elem is None:
                continue
            arr.extend(elem.elems())
        return arr
    
    def toJSONObject(self):
        return {'type': 'Hash', 'buckets': [e if e is None else e.toJSONObject() for e in self._elems]}
        
    def __str__(self):
        return json.dumps(self.toJSONObject())

    def __repr__(self):
        return str(self)


print 
h = Hash([['a', 22], ['z', 4], ['xyz', 32], ['k', 'oops'], ['arg', 'me'], ['u', 22], ['q', 11], ['r', 43]])
print h
print h.elems()
for k in ['a', 'z', 'xyz', 'k', 'b', 2, 'kr']:
    print h.has(k), 'key %s' % k
    try:
        print h.get(k)
    except KeyError:
        print "nope -- don't have key %s" % k
for k in ['z', 'arg', 'r', 'u', 'zz', 'aa']:
    print 'removing %s' % k, h.remove(k)
    print h.elems()
    
