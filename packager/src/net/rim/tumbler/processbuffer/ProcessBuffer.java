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

/**
 * Provides a common base for classes that facilitate the unimpeded execution
 * of subprocesses returned from the <code>exec()</code> methods of class
 * <code>Runtime</code>.
 * <p>
 * Process buffer objects can be constructed with the <code>Process</code>
 * object returned from a call to <code>Runtime.exec()</code>:
 * <pre>
 *     String cmd = ...;
 *     Process p = Runtime.getRuntime().exec(cmd);
 *
 *     //
 *     // Because some native platforms only provide limited buffer size for
 *     // standard output streams, we promptly read the output streams using
 *     // a separate thread so that this thread can proceed without blocking.
 *     // The ProcessBuffer subclasses hide the implementation details.
 *     //
 *     ErrorBuffer stderr = new ErrorBuffer(p);
 *     OutputBuffer stdout = new OutputBuffer(p);
 *     ExitBuffer exitValue = new ExitBuffer(p);
 * </pre>
 * The <code>ErrorBuffer</code> uses a separate thread to read from the
 * standard error stream of the subprocess, and is made available upon
 * reaching the end of the error stream.
 * <p>
 * The <code>OutputBuffer</code> uses a separate thread to read from the
 * standard output stream of the subprocess, and is made available upon
 * reaching the end of the output stream.
 * <p>
 * The <code>ExitBuffer</code> uses a separate thread to wait for completion
 * of the subprocess, at which time the buffer is made available containing
 * the exit value of the subprocess.
 * <p>
 * To block until a buffer is available, use the <code>waitFor()</code>
 * method. To test (or "poll") whether a buffer is available, use the
 * <code>available()</code> method. Details about accessing the actual
 * contents of the buffer are specific to the particular subclass.
 */
public abstract class ProcessBuffer {

    /**
     * The subclass-specific processing performed within this class is
     * intended for a separate thread, allowing the calling thread to
     * continue without blocking. This private inner class hides the
     * implementation of the Runnable interface.
     */
    private class FillerThread implements Runnable {
        /**
         * Performs subclass-specific processing (via <code>fill()</code>)
         * and then notifies all threads that the buffer is available so that
         * they can unblock and make use of the result. Details about the
         * contents of the buffer are specific to the particular subclass.
         */
        public void run() {
            fill();
            synchronized (_flagSync) {
                _available = true;
                _flagSync.notifyAll();
            }
        }
    }

    /**
     * Used for synchroniztion with respect to whether or not the buffer
     * has been made available. The contents of a buffer are meaningful
     * only after the buffer has been made available.
     */
    private Object _flagSync;

    /**
     * Indicates whether the contents of the buffer are available.
     * Access is synchronized via '_flagSync'.
     */
    private boolean _available;

    /**
     * Used for synchronizing access to the process.
     */
    private Object _processSync;

    /**
     * The subprocess being buffered. Access is synchronized via
     * '_processSync'.
     */
    private Process _process;

    /**
     * An object made available to subclasses for synchronizing access to
     * their specific buffers.
     */
    private Object _bufferSync;

    /**
     * Default constructor, scoped to restrict subclasses to within
     * this package due to non-trivial thread considerations.
     */
    ProcessBuffer() {
        _flagSync = new Object();
        _processSync = new Object();
        _bufferSync = new Object();
    }

    /**
     * Causes the current thread to wait, if necessary, until the contents
     * of this buffer are available. This method returns immediately if the
     * buffer contents are already available. If the contents are not
     * available, the calling thread will be blocked until they become
     * available.
     *
     * @exception java.lang.InterruptedException
     *            if the current thread is interrupted by another thread
     *            while it is waiting.
     */
    public void waitFor() throws InterruptedException {
        //
        // "Never invoke the wait method outside a loop"
        // Reference: Effective Java, by Joshua Bloch, Item 50.
        //
        synchronized (_flagSync) {
            while (!_available) {
                _flagSync.wait();
            }
        }
    }

    /**
     * Indicates whether the contents of the buffer are available.
     *
     * @return <code>true</code> if the contents of the buffer are
     * available and ready to be accessed, <code>false</code>
     * otherwise. For details about accessing the buffer contents,
     * refer to subclass documentation.
     */
    public boolean available() {
        boolean result;

        synchronized (_flagSync) {
            result = _available;
        }

        return result;
    }

    /**
     * Begins a separate thread for filling the buffer, and promptly
     * returns. Subclasses of this class should call this method from
     * their constructors after initializing their own state, if any.
     *
     * @param process the subprocess being buffered.
     */
    final void activate(Process process) {
        synchronized (_processSync) {
            _process = process;
        }
        new Thread(new FillerThread()).start();
    }

    /**
     * Returns the subprocess being buffered.
     *
     * @return the subprocess being buffered.
     */
    final Process getProcess() {
        Process result;

        synchronized (_processSync) {
            result = _process;
        }

        return result;
    }

    /**
     * Performs subclass-specific processing needed to fill the buffer
     * prior to being made available.
     */
    abstract void fill();

    /**
     * Returns the object to be used by subclasses for synchronizing access
     * to their specific buffers.
     *
     * @return the object to be used by subclasses for synchronizing access
     * to their specific buffers.
     */
    final Object getBufferSync() {
        return _bufferSync;
    }
}
