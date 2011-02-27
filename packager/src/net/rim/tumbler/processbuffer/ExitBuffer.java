/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package net.rim.tumbler.processbuffer;

/**
 * Class <code>ExitBuffer</code> uses a separate thread to wait for completion
 * of the subprocess, at which time the buffer is made available containing
 * the exit value of the subprocess.
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
public final class ExitBuffer extends ProcessBuffer {

    /**
     * The exit value of the subprocess, or <code>null</code> if either the
     * buffer isn't available yet or an exit value couldn't be obtained.
     * Access is synchronized via 'getBufferSync()'.
     */
    private Integer _exitValue;

    /**
     * Starts a separate thread to buffer the specified subprocess, and
     * promptly returns. Later, after the contents of the buffer have been
     * made available, they can be accessed via the methods of this class.
     *
     * @param process the subprocess being buffered.
     */
    public ExitBuffer(Process process) {
        // perform own initialization here if needed
        // (none needed)

        // mandatory for subclasses of ProcessBuffer
        activate(process);
    }

    /**
     * Returns the exit value of the subprocess, or <code>null</code> if
     * either the buffer isn't available yet or an exit value couldn't be
     * obtained.
     *
     * @return the exit value of the subprocess, or <code>null</code> if
     * either the buffer isn't available yet or an exit value couldn't be
     * obtained.
     */
    public Integer getExitValue() {
        Integer result;

        synchronized (getBufferSync()) {
            result = _exitValue;
        }

        return result;
    }

    /**
     * Waits for completion of the subprocess and then fills this buffer
     * with the exit value of the subprocess.
     */
    void fill() {
        try {
            int code = getProcess().waitFor();
            synchronized (getBufferSync()) {
                _exitValue = new Integer(code);
            }
        } catch (InterruptedException ie) {
            // do nothing - getExitValue() will return null
        }
    }
}
