/*

there are two reason behind this.
1. In write or appendfile sync/async : 
    file gets open and closed every time we write something to it.
    so, it takes time to open and close the file every time.

    while in streams, file gets open only once and closed only once.
    it gets open when we create a write stream and closed when we call end() method.

    write the data to internal buffer and then write to file.

    can we do the file opening and closing in write or appendfile only once?

    yes.. will do next. need to have knowledge of file descriptors.

2. In streams we can write data in chunks(writes to internal buffer of 16KB by default)
    then it goes to write in the actual file in disk.

    while in write or appendfile, it writes the data directly to the file.

*/
