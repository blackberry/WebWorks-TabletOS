/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package net.rim.tumbler.processbuffer;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.IOException;

/**
 * Class <code>OutputBuffer</code> uses a separate thread to read from the
 * standard output stream of the subprocess, and is made available upon
 * reaching the end of the output stream.
 * <p>
 * This class helps avoid potential deadlocks in the subprocess returned from
 * a call to <code>Runtime.exec()</code>. The <code>exec()</code> methods in
 * <code>java.lang.Runtime</code> return a <code>Process</code> object for
 * managing the subprocess. As mentioned in the documentation for class
 * <code>java.lang.Process</code>, failure to promptly read the output stream
 * of the subprocess may cause the subprocess to block, and even deadlock.
 * <p>
 * Use this class to reduce the risk of deadlock even if you don't plan to
 * access contents of the buffer after they become available.
 *
 * @see ProcessBuffer
 */
public final class OutputBuffer extends ProcessBuffer {

    /**
     * The contents as read from the standard output stream, or
     * <code>null</code> if either the buffer isn't available yet or
     * the output stream could not be completely read.
     * Access is synchronized via 'getBufferSync()'.
     */
    private byte[] _stdout;

    /**
     * Starts a separate thread to buffer the specified subprocess, and
     * promptly returns. Later, after the contents of the buffer have been
     * made available, they can be accessed via the methods of this class.
     *
     * @param process the subprocess being buffered.
     */
    public OutputBuffer(Process process) {
        // perform own initialization here if needed
        // (none needed)

        // mandatory for subclasses of ProcessBuffer
        activate(process);
    }

    /**
     * Returns the contents as read from the standard output stream, or
     * <code>null</code> if either the buffer isn't available yet or
     * the output stream could not be completely read.
     *
     * @return the contents as read from the standard output stream, or
     * <code>null</code> if either the buffer isn't available yet or
     * the output stream could not be completely read.
     */
    public byte[] getStdout() {
        byte[] result;

        synchronized (getBufferSync()) {
            result = _stdout;
        }

        return result;
    }

    /**
     * Reads to the end of the output stream and then fills this buffer
     * with the result.
     */
    void fill() {
        try {
            InputStream is = getProcess().getInputStream();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            for (int b; (b = is.read()) != -1; baos.write(b))
                ;
            synchronized (getBufferSync()) {
                _stdout = baos.toByteArray();
            }
        } catch (IOException ioe) {
            // do nothing - getStdout() will return null
        }
    }
}
